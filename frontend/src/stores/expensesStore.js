import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useExpensesStore = defineStore('expenses', () => {
    const expenses = ref([]);
    const expense = ref(null);
    const baseUrl = meta.env.VITE_BASE_URL;
    const apiUrl = `${baseUrl}/api/v1`;

    const expenditure = computed(() => {
        return expenses.value.reduce((total, expense) => {
            return total + expense.amount;
        }, 0);
    });

    const addExpense = async (expense) => {
        try {
            const response = await fetch(`${apiUrl}/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense),
            });
            
            if (!response.ok) {
                throw new Error('Error adding expense');
            }
            await fetchExpenses();
        } catch (error) {
            console.log('Error adding expense', error);
        };
    };

    const fetchExpenses = async () => {
        try {            
            const response = await fetch(`${apiUrl}/expenses`);
            if (!response.ok) {
                throw new Error('Error fetching expenses');
            }
            const data = await response.json();
            const currentMonth = new Date().getMonth();
            expenses.value = data.filter(expense => {
                const expenseMonth = (new Date(expense.date)).getMonth();
                return expenseMonth === currentMonth;
            });
        } catch (error) {
            console.log('Error fetching expenses', error);
        };
    };

    const fetchExpense = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/expenses/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching expense');
            }
            expense.value = await response.json();
        } catch (error) {
            console.log('Error fetching expense', error);
        };
    };

    const updateExpense = async (expense) => {
        try {
            const response = await fetch(`${apiUrl}/expenses/${expense.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense),
            });
            if (!response.ok) {
                throw new Error('Error updating expense');
            }
            await fetchExpenses();
        } catch (error) {
            console.log('Error updating expense', error);
        };
    };

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/expenses/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting expense');
            }
            await fetchExpenses();
        } catch (error) {
            console.log('Error deleting expense', error);
        };
    };

    return {
        expenses,
        expense,
        expenditure,
        addExpense,
        fetchExpenses,
        fetchExpense,
        deleteExpense,
        updateExpense,
    };
});
