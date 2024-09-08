import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { ref } from 'vue';

export const useExpensesStore = defineStore('expenses', () => {
    const expenses = ref([]);
    const expense = ref({});
    const token = LocalStorage.getItem('token');
    const apiUrl = 'http://localhost:3000/api/v1';

    const addExpense = async (expense) => {
        try {
            const response = await fetch(`${apiUrl}/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
            const response = await fetch(`${apiUrl}/expenses`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching expenses');
            }
            expenses.value = await response.json();
        } catch (error) {
            console.log('Error fetching expenses', error);
        };
    };

    const fetchExpense = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
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
                    'Authorization': `Bearer ${token}`,
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
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
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
        addExpense,
        fetchExpenses,
        fetchExpense,
        deleteExpense,
        updateExpense,
    };
});
