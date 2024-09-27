<template>
    <div class="welcome">
        <h2>Hello, <span class="username text-secondary">{{ firstName }}</span></h2>
        <p>Here is your budget overview</p>
    </div>

    <div class="card mobile-limit bg-accent">
        <div v-if="budget">
            <h2>Budget</h2>
            <p>${{ budget.budget }}</p>
        </div>

        <div v-else>
            <AddBudgetForm />  
        </div>
    </div>
    
    <div class="budget">
        <div class="card limit bg-accent">
            <div v-if="budget">
                <h2>Budget</h2>
                <p>Kes {{ budget }}</p>
            </div>

            <div v-else>
                <AddBudgetForm />
            </div>
        </div>

        <div class="card spent bg-accent">
            <div>
                <h2>Total spent</h2>
                <p v-if="expenditure">Kes {{ expenditure }}</p>
                <p v-else>Kes 0</p>
            </div>
        </div>

        <div class="card balance bg-accent">
            <div>
                <h2>Balance</h2>
                <p v-if="balance">Kes {{ balance }}</p>
                <p v-else>Kes 0</p>
            </div>
        </div>
    </div>

    <AddExpenseForm />

    <div class="entries bg-primary">
        <div v-if="expenses.length==0" class="loading">
            <p>No expenses found</p>
        </div>
        <div v-else class="available">
            <EntryCard v-for="entry in expenses" :entry="entry" :key="entry.id" />
        </div>
    </div>

</template>

<script setup>
import EntryCard from '../components/EntryCard.vue';
import AddExpenseForm from '../components/AddExpenseForm.vue';
import AddBudgetForm from '../components/AddBudgetForm.vue';
import { useExpensesStore } from '../stores/expensesStore';
import { useBudgetStore } from '../stores/budgetStore';
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Cookies } from 'quasar';

const expensesStore = useExpensesStore();
const budgetStore = useBudgetStore();

const firstName = ref(Cookies.get('firstName'));
const { expenses } = storeToRefs(expensesStore);
const { expenditure } = storeToRefs(expensesStore);
const { budget } = storeToRefs(budgetStore);
const balance = computed(() => budget.value - expenditure.value);

onMounted(async () => {
    await budgetStore.fetchBudget();
    console.log('budget:', budget.value);
    await expensesStore.fetchExpenses();
});
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
    margin-bottom: 0;
    padding: 0.5rem;

    .logout {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
}

.welcome {
    margin: 0 1rem;
    padding: 0.5rem;

    /* .username {
        color: #E6B272;
    } */

}

.balance {
    margin: 1rem;
    padding: 0.5rem;
}

.budget {
    display: flex;
    gap: 1rem;
}

.mobile-limit {
    display: none;
    max-width: 96vw;
}

@media (max-width: 850px) {
    .mobile-limit {
        display: flex;
        max-width: 92vw;
    }

    .limit {
        display: none;
    }
}
</style>