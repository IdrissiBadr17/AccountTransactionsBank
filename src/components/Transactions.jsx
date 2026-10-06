import { transactionFormatDisplay } from "../utils/accountImpl";

function Transactions({ transactions }) {
  const totalTransactions = transactions.length;

  const formattedTransactions = transactions.map((transaction) =>
    transactionFormatDisplay(transaction),
  );

  return (
    <section className="transactions">
      <div className="transactions-header">
        <div>
          <h2>Transaction History</h2>
          <p>Your recent account activity.</p>
        </div>

        <span className="transaction-count">{`${totalTransactions <= 0 ? "No transaction" : `${totalTransactions} transaction${totalTransactions !== 1 ? "s" : ""}`}`}</span>
      </div>

      {formattedTransactions.length > 0 ?
        <div className="transaction-list">
          {formattedTransactions.map((tx) => (
            <div className="transaction" key={tx.transactionId}>
              <div className="transaction-left">
                <div className={`transaction-icon transaction-${tx.type}`}>
                  {tx.icon}
                </div>
                <div>
                  <h3>{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</h3>
                  <p>{tx.date}</p>
                </div>
              </div>
              <span
                className={`amount ${tx.type === "deposit" ? "positive" : "negative"}`}>
                {tx.type === "deposit" ? "+" : "-"}
                {` $${tx.amount.toFixed(2)}`}
              </span>
            </div>
          ))}
        </div>
      : <p>No transactions to display.</p>}
    </section>
  );
}

export default Transactions;
