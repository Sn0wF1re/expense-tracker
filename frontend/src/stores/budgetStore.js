import { defineStore } from "pinia";
import { ref } from "vue";

export const useBudgetStore = defineStore("budget", () => {
    const budget = ref({});
    const apiUrl = "http://localhost:3000/api/v1";

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
        try {
            const response = await fetch(`${apiUrl}/budgets`);
            if (!response.ok) {
                throw new Error("Error fetching budget");
            }
            budget.value = await response.json();
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