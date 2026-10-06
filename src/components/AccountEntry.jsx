function AccountEntry({ onCreateAccount, onActivateAccount }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">🏦</div>

        <h2>Welcome to MyBank</h2>

        <p className="modal-text">What would you like to do?</p>

        <div className="entry-actions">
          <button className="entry-btn activate" onClick={onActivateAccount}>
            <span className="entry-icon">🔐</span>

            <span>
              <strong>Activate Account</strong>
              <small>I already have an account</small>
            </span>
          </button>

          <button className="entry-btn create" onClick={onCreateAccount}>
            <span className="entry-icon">➕</span>

            <span>
              <strong>Create Account</strong>
              <small>I want to create a new account</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountEntry;
