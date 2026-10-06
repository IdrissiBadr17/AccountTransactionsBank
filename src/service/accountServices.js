import { calculateNewBalance } from "../utils/accountImpl";

import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:3000/accounts";

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}).`);
  }
  return response.json();
}

export async function getAccountByNumber(accountNumber) {
  const accounts = await request(
    `${API_URL}?account_number=${encodeURIComponent(accountNumber)}`,
  );
  if (accounts.length === 0) throw new Error("Account not found.");
  return accounts[0];
}

// One request: PATCH by id (no need to look the account up again).
export function updateAccount(accountId, newBalance, transactions) {
  return request(`${API_URL}/${accountId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ balance: newBalance, transactions: transactions }),
  });
}

export function addTransaction(
  account,
  type,
  amount,
  otherAccountNumber = null,
  transferDirection = null,
) {
  const transaction = {
    transactionId: uuidv4(),
    transactionType: type,
    transactionAmount: amount,
    dateTimeTransaction: new Date().toISOString(),
    otherAccountNumber: otherAccountNumber,
    transferDirection: transferDirection,
  };

  return [...(account.transactions || []), transaction];
}

// Used by both deposit and withdraw. Returns the account as saved by the server.
export async function performOperation(account, type, amount) {
  const newBalance = calculateNewBalance(account.balance, type, amount);

  const transactions = addTransaction(account, type, amount);

  return updateAccount(account.id, newBalance, transactions);
}

export async function transferAmountToRecipient(transferRequest) {
  const { from, to, amount } = transferRequest;

  const sender = await getAccountByNumber(from);
  const recipient = await getAccountByNumber(to);

  if (amount > Number(sender.balance)) {
    throw new Error("Insufficient funds.");
  }

  const senderNewBalance = Number(sender.balance) - amount;

  const recipientNewBalance = Number(recipient.balance) + amount;

  const senderTransactions = addTransaction(
    sender,
    "transfer",
    amount,
    recipient.account_number,
    "sent",
  );

  const recipientTransactions = addTransaction(
    sender,
    "transfer",
    amount,
    sender.account_number,
    "received",
  );

  await updateAccount(sender.id, senderNewBalance, senderTransactions);

  await updateAccount(recipient.id, recipientNewBalance, recipientTransactions);

  return {
    ...sender,
    balance: senderNewBalance,
    transactions: senderTransactions,
  };
}
