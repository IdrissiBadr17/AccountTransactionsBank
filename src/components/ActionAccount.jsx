function ActionAccount() {
  return (
    <section className="account-actions">
      <h2>Account Actions</h2>

      <div className="action-buttons">
        <button className="action-btn activate">✓ Activate Account</button>

        <button className="action-btn deactivate">⏸ Deactivate Account</button>

        <button className="action-btn reset">↻ Reset Account</button>
      </div>
    </section>
  );
}

export default ActionAccount;
