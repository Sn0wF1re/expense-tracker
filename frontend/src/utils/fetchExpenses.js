export const fetchExpenses = async () => {
  try {
    const res = await fetch("https://expense-tracker-api-esx2.onrender.com/api/expenses/");
    if (!res.ok) {
      throw new Error("Network error");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error fetching expenses:", err);
  }
};
