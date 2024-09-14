<template>
    <!-- <div class="header">
        <h2>WapiDoh</h2>
        <a class="logout" @click="logout">Log Out</a>
    </div> -->

    <div class="welcome">
        <h2>Hello, <span class="username text-secondary">{{ firstName }}</span></h2>
        <p>Here is your budget overview</p>
    </div>

    <div class="card mobile-limit bg-accent">
        <h2>Budget</h2>
        <p>$3000</p>
    </div>
    
    <div class="budget">
        <div class="card limit bg-accent">
            <h2>Budget</h2>
            <p>$3000</p>
        </div>

        <div class="card spent bg-accent">
            <h2>Total spent</h2>
            <p>$1000</p>
        </div>

        <div class="card balance bg-accent">
            <h2>Balance</h2>
            <p>$2000</p>
        </div>
    </div>

    <AddExpenseForm />

    <div class="entries bg-primary">
        <!-- <EntryCard description="Entry 1" price="$100" category="Fuel" date="2022-01-01" />
        <EntryCard description="Entry 2" price="$200" category="Food" date="2022-01-01" /> -->
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
import { useExpensesStore } from '../stores/expensesStore';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { LocalStorage } from 'quasar';

const expensesStore = useExpensesStore();

const firstName = ref(LocalStorage.getItem('firstName'));
const { expenses } = storeToRefs(expensesStore);

onMounted(() => {
    expensesStore.fetchExpenses();
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