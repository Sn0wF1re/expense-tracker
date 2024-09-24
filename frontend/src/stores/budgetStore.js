import { defineStore } from "pinia";
import { ref } from "vue";
import { LocalStorage } from "quasar";

const token = LocalStorage.getItem("token");

export const useBudgetStore = defineStore("budget", () => {
    const budget = ref(null);
    const apiUrl = "http://localhost:3000/api/v1";

    const addBudget = async (budget) => {
        try {
            const response = await fetch(`${apiUrl}/budgets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
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
            const response = await fetch(`${apiUrl}/budgets/${currentMonth}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
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