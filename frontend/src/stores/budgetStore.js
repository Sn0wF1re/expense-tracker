import { defineStore } from "pinia";
import { Cookies } from "quasar";
import { ref } from "vue";

export const useBudgetStore = defineStore("budget", () => {
    const budget = ref(0);
    const baseUrl = process.env.BASE_URL;
    const apiUrl = `${baseUrl}/api/v1`;
    const token = Cookies.get("token");

    const addBudget = async (budget) => {
        try {
            const response = await fetch(`${apiUrl}/budgets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ budget }),
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