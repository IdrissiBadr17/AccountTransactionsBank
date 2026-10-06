function CardBalance({
  currency,
  balance,
  fullName,
  isActive,
  account_number,
}) {
  return (
    <section className="balance-card">
      <div className="balance-header">
        <span>ACCOUNT BALANCE</span>
        <span className="currency">{currency}</span>
      </div>

      <div className="balance">${balance.toFixed(2)}</div>

      <div className="account-info">
        <div>
          <span className="label">Account Number</span>
          <strong>{account_number}</strong>
        </div>

        <div>
          <span className="label">Account Holder</span>
          <strong>{fullName}</strong>
        </div>

        <div>
          <span className="label">Account Status</span>
          <strong className={isActive ? "active" : "inactive"}>
            {isActive ? "Active" : "Inactive"}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default CardBalance;
