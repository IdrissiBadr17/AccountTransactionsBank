import { formatTransactionDate } from "./accountTools";

export function calculateNewBalance(balance, type, amount) {
  if (type === "deposit") return balance + amount;

  if (type === "withdraw") {
    if (amount > balance) throw new Error("Insufficient funds.");
    return balance - amount;
  }

  throw new Error(`Unknown operation: ${type}`);
}

export function transactionFormatDisplay(transaction) {
  const {
    transactionId,
    transactionType,
    transactionAmount,
    dateTimeTransaction,
    otherAccountNumber,
    transferDirection,
  } = transaction;

  return {
    transactionId,
    type: transactionType,
    icon:
      transactionType === "deposit" ? "↓"
      : transactionType === "withdraw" ? "↑"
      : "→",
    amount: Number(transactionAmount),
    date: formatTransactionDate(dateTimeTransaction),
    receiver: otherAccountNumber,
    transferDirection: transferDirection,
  };
}
