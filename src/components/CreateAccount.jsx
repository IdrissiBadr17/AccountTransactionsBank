import { useState } from "react";
import { createAccount } from "../service/accountServices";

function CreateAccount({ onBack, dispatch }) {
  const [userHolder, setUserHolder] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateAccountBank(e) {
    e.preventDefault();
    setErrorMessage("");

    const fullName = userHolder.trim();

    if (!fullName || !password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createAccount({
        fullName,
        password,
      });

      dispatch({ type: "activateScreen" });
    } catch (error) {
      setErrorMessage(error.message || "Failed to create account.");
    } finally {
      setIsSubmitting(false);
    }
  }

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

        {errorMessage && (
          <p className="error-message" role="alert">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleCreateAccountBank}>
          <div className="account-form-group">
            <label htmlFor="account-holder">Account Holder</label>

            <input
              id="account-holder"
              type="text"
              value={userHolder}
              onChange={(e) => setUserHolder(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />
          </div>

          <div className="account-form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="create-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
