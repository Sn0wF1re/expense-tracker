import { defineStore } from "pinia";
import { ref } from "vue";

export const useBudgetStore = defineStore("budget", () => {
    const budget = ref(null);
    const baseUrl = meta.env.VITE_BASE_URL;
    const apiUrl = `${baseUrl}/api/v1`;

    const addBudget = async (budget) => {
        try {
            const response = await fetch(`${apiUrl}/budgets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(budget),
            });
            if (!response.ok) {
                throw new Error("Error adding budget");
            }
            await fetchBudget();
        } catch (error) {
            console.log("Error adding budget", error);
        };
    };

    const fetchBudget = async () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const currentMonth = monthNames[new Date().getMonth()];

        try {
            const response = await fetch(`${apiUrl}/budgets/${currentMonth}`);
            if (!response.ok) {
                throw new Error("Error fetching budget");
            }
            const data = await response.json();
            budget.value = data.budget;
        } catch (error) {
            console.log("Error fetching budget", error);
        };
    };


    return {
        budget,
        addBudget,
        fetchBudget,
    };
});