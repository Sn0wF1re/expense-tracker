import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useExpensesStore = defineStore('expenses', () => {
    const expenses = ref([]);
});
