export function parseAmount(input) {
  const trimmed = String(input).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) return null;
  const amount = Number(trimmed);
  return amount > 0 ? amount : null;
}

export function formatTransactionDate(dateTimeTransaction) {
  const transactionDate = new Date(dateTimeTransaction);
  const now = new Date();

  const transactionDay = new Date(
    transactionDate.getFullYear(),
    transactionDate.getMonth(),
    transactionDate.getDate(),
  );

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const differenceInDays = Math.floor(
    (today - transactionDay) / (1000 * 60 * 60 * 24),
  );

  // Today
  if (differenceInDays === 0) {
    return `Today, ${transactionDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  // Yesterday
  if (differenceInDays === 1) {
    return `Yesterday, ${transactionDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  if (differenceInDays >= 2 && differenceInDays < 7) {
    return `${differenceInDays} days ago`;
  }

  // Older transactions
  return transactionDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
