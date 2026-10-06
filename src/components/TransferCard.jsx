import { useState } from "react";
import { parseAmount } from "../utils/accountTools";
import { transferAmountToRecipient } from "../service/accountServices";
function TransferCard({ dispatch, account }) {
  const [amountValue, setAmountValue] = useState("");
  const [accountNumberRecipient, setAccountNumberRecipient] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleTransfer(to, amountTransfer) {
    if (isSubmitting) return;

    if (!account || !account.id) {
      dispatch({
        type: "operationFailed",
        payload: "No active account selected.",
      });
      return;
    }
    const amount = parseAmount(amountTransfer);
    if (amount === null) {
      dispatch({
        type: "operationFailed",
        payload: "Please enter a valid amount (e.g. 25 or 25.50).",
      });
      return;
    }

    if (!to.trim()) {
      dispatch({
        type: "operationFailed",
        payload: "Please enter a recipient account number.",
      });
      return;
    }

    if (to === account.account_number) {
      dispatch({
        type: "operationFailed",
        payload: "You cannot transfer money to your own account.",
      });

      return;
    }

    const transferRequest = {
      from: account.account_number,
      to,
      amount,
    };

    setIsSubmitting(true);
    try {
      const updatedAccount = await transferAmountToRecipient(transferRequest);
      dispatch({
        type: "accountUpdated",
        payload: updatedAccount,
      });
      setAmountValue("");
      setAccountNumberRecipient("");

      console.log("Transfer successful:", updatedAccount);
    } catch (error) {
      dispatch({
        type: "operationFailed",
        payload: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="transfer-card">
      <div className="section-title">
        <div className="operation-icon transfer-icon">→</div>

        <div>
          <h2>Transfer Money</h2>
          <p>Send money to another account.</p>
        </div>
      </div>

      <div className="transfer-form">
        <div className="transfer-form-group">
          <label htmlFor="recipient">Recipient</label>

          <input
            id="recipient"
            type="text"
            disabled={isSubmitting}
            value={accountNumberRecipient}
            onChange={(e) => setAccountNumberRecipient(e.target.value)}
            placeholder="Enter account number"
          />
        </div>

        <div className="transfer-form-group">
          <label htmlFor="transfer-amount">Amount</label>

          <div className="input-wrapper">
            <span>$</span>
            <input
              id="transfer-amount"
              type="text"
              disabled={isSubmitting}
              placeholder="0.00"
              value={amountValue}
              onChange={(e) => setAmountValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        className="btn btn-transfer"
        onClick={() => handleTransfer(accountNumberRecipient, amountValue)}>
        {isSubmitting ? "Transferring..." : "Transfer Money"}
      </button>
    </section>
  );
}

export default TransferCard;
