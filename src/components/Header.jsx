function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">🏦</span>
        <span>MyBank</span>
      </div>

      <div className="account-status">
        <span className="status-dot"></span>
        Account Active
      </div>
    </header>
  );
}

export default Header;
