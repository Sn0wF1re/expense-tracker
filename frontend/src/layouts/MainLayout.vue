<template>
    <header class="header">
        <h2>WapiDoh</h2>

        <nav class="navigation">
            <a>Expenses</a>
            <router-link to="/categories">Categories</router-link>
        </nav>
        <a class="logout" @click="logout">Log Out</a>
    </header>

    <router-view />

    <footer class="footer">
        <p>&copy; {{ date }} WapiDoh</p>
    </footer>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const date = new Date().getFullYear();
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

    .navigation {
        display: flex;
        gap: 1rem;
    }

    .logout {
        color: #E06336;
        text-decoration: none;
        cursor: pointer;
    }
}

.footer {
    display: flex;
    justify-content: center;
    margin: 1rem;
    padding: 1rem 0.5rem;
    /* border-top: 1px solid #E06336; */

    p {
        margin: 0;
    }
}
</style>