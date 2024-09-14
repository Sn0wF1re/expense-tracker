<template>
    <h2>{{ categoryName }}</h2>

    <div class="entries bg-primary">
        <div v-if="expenses.length==0" class="loading">
            <p>No Expenses</p>
        </div>
        
        <div v-else>
            <EntryCard v-for="entry in expenses" :entry="entry" :key="entry._id" />
        </div>
    </div>
</template>

<script setup>
import EntryCard from '../components/EntryCard.vue';
import { useCategoriesStore } from '../stores/categoriesStore';
import { useExpensesStore } from '../stores/expensesStore';
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps({
    categoryId: {
        type: String,
        required: true
    }
});

const categoriesStore = useCategoriesStore();
const expensesStore = useExpensesStore();
const categoryId = ref(props.categoryId);
const categoryExpenses = ref([]);
const categoryName = ref('');
const expenses = ref([]);
const { expense } = storeToRefs(expensesStore); 

onMounted(async() => {
    await categoriesStore.fetchCategory(categoryId.value);
    const { category } = storeToRefs(categoriesStore);
    categoryName.value = category.value.name;
    categoryExpenses.value = category.value.expenses;
    const expenseIds = category.value.expenses;

    // Fetch expenses
    try {
        for (const expenseId of expenseIds) {
            await expensesStore.fetchExpense(expenseId);
            const { expense } = storeToRefs(expensesStore);
            if (expense.value) {
                expenses.value.push({ ...expense.value });
            } else {
                console.log(`Expense with ID ${expenseId} not found`);
            }
        }
    } catch (error) {
        console.error(error);
    }
});
</script>

<style scoped>
/* .forms {
    display: flex;
    justify-content: center;
    gap: 3rem;
} */

h2 {
    margin: 1.2rem;
}
</style>