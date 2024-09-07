<template>
    <!-- <div class="header">
        <h2>WapiDoh</h2>
        <a class="logout" @click="logout">Log Out</a>
    </div> -->

    <div class="welcome">
        <h2>Hello, Clinton</h2>
        <p>Here is your budget overview</p>
    </div>

    <div class="card mobile-limit">
        <h2>Budget</h2>
        <p>$3000</p>
    </div>
    
    <div class="budget">
        <div class="card limit">
            <h2>Budget</h2>
            <p>$3000</p>
        </div>

        <div class="card spent">
            <h2>Total spent</h2>
            <p>$1000</p>
        </div>

        <div class="card balance">
            <h2>Balance</h2>
            <p>$2000</p>
        </div>
    </div>

    <AddExpenseForm v-model:isDialogOpen="isDialogOpen" />

    <div class="entries">
        <EntryCard description="Entry 1" price="$100" category="Fuel" date="2022-01-01" />
        <EntryCard description="Entry 2" price="$200" category="Food" date="2022-01-01" />
        <EntryCard description="Entry 3" price="$300" category="Entertainment" date="2022-01-01" />
    </div>
</template>

<script setup>
import EntryCard from '../components/EntryCard.vue';
import AddExpenseForm from '../components/AddExpenseForm.vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const logout = () => {
    authStore.logout();
};
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
        color: #E06336;
        text-decoration: none;
        cursor: pointer;
    }
}

.welcome {
    margin: 0 1rem;
    padding: 0.5rem;
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