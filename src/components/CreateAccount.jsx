function CreateAccount({ onBack }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button
          type="button"
          className="back-icon"
          aria-label="Go back"
          onClick={onBack}>
          ←
        </button>
        <div className="modal-icon">🏦</div>

        <h2>Create Bank Account</h2>

        <p className="modal-text">
          Enter your information to create your account.
        </p>

        <form>
          <div className="account-form-group">
            <label htmlFor="account-holder">Account Holder</label>

            <input
              id="account-holder"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="account-form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="create-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
