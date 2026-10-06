import { useEffect, useState } from "react";

function ActivateAccount({ dispatch, onBack }) {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!credentials) return;

    async function activateAccount() {
      const { accountNumber, password } = credentials;

      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:3000/accounts?account_number=${encodeURIComponent(accountNumber)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch account");
        }

        const accounts = await response.json();

        if (accounts.length === 0) {
          alert("Account not found.");
          return;
        }

        const account = accounts[0];

        if (account.password !== password) {
          alert("Invalid password.");
          return;
        }

        dispatch({
          type: "homeScreen",
          payload: { ...account, isActive: true },
        });
        
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    activateAccount();
  }, [credentials, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);

    const accountNumber = formData.get("accountNumber").trim();
    const password = formData.get("password").trim();

    setCredentials({ accountNumber, password });
  };

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
        <div className="modal-icon activate-icon">🔐</div>

        <h2>Activate Account</h2>

        <p className="modal-text">
          Enter your account credentials to activate your bank account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="account-form-group">
            <label>Account Number</label>

            <input
              type="text"
              name="accountNumber"
              placeholder="Enter your account number"
              required
            />
          </div>

          <div className="account-form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="activate-btn" disabled={loading}>
            {loading ? "Checking..." : "Activate Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActivateAccount;
