function Main({ children, fullName }) {
  return (
    <main className="main">
      <section className="welcome">
        <h1>Welcome, {fullName} 👋</h1>
        <p>Manage your account and transactions.</p>
      </section>
      {children}
    </main>
  );
}

export default Main;
