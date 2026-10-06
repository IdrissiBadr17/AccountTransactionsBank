import { useState } from "react";
import { parseAmount } from "../utils/accountTools";
import { performOperation } from "../service/accountServices";

function OperationCards({ account, dispatch }) {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleOperation(type, rawAmount) {
    if (isSubmitting) return;

    if (!account || !account.id) {
      dispatch({
        type: "operationFailed",
        payload: "No active account selected.",
      });
      return;
    }

    const amount = parseAmount(rawAmount);
    if (amount === null) {
      dispatch({
        type: "operationFailed",
        payload: "Please enter a valid amount (e.g. 25 or 25.50).",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedAccount = await performOperation(account, type, amount);

      dispatch({
        type: "accountUpdated",
        payload: { ...updatedAccount, isActive: true },
      });

      setDepositAmount("");
      setWithdrawAmount("");
    } catch (error) {
      dispatch({ type: "operationFailed", payload: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="operations">
      <div className="operation-card">
        <div className="operation-icon deposit-icon">↓</div>

        <h2>Deposit</h2>
        <p>Add money to your account.</p>

        <label htmlFor="deposit">Amount</label>

        <div className="input-wrapper">
          <span>$</span>
          <input
            id="deposit"
            type="text"
            disabled={isSubmitting}
            value={depositAmount}
            placeholder="0.00"
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </div>

        <button
          className="btn btn-deposit"
          disabled={isSubmitting}
          onClick={() => handleOperation("deposit", depositAmount)}>
          Deposit
        </button>
      </div>

      <div className="operation-card">
        <div className="operation-icon withdraw-icon">↑</div>

        <h2>Withdraw</h2>
        <p>Take money from your account.</p>

        <label htmlFor="withdraw">Amount</label>

        <div className="input-wrapper">
          <span>$</span>
          <input
            id="withdraw"
            type="text"
            disabled={isSubmitting}
            value={withdrawAmount}
            placeholder="0.00"
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
        </div>

        <button
          className="btn btn-withdraw"
          disabled={isSubmitting}
          onClick={() => handleOperation("withdraw", withdrawAmount)}>
          Withdraw
        </button>
      </div>
    </section>
  );
}

export default OperationCards;
