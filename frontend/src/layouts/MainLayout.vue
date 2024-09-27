<template>
    <div class="wrapper">
        <header class="header">
            <h2>WapiDoh</h2>
    
            <nav class="navigation">
                <router-link to="/app/expenses">Expenses</router-link>
                <router-link to="/app/categories">Categories</router-link>
            </nav>
            <a class="logout" @click="logout">Log Out</a>
        </header>
    
        <div class="content">
            <router-view />
        </div>
    
        <footer class="footer">
            <p>&copy; {{ date }} WapiDoh</p>
        </footer>
    </div>
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
.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
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
    
            a {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }
    
            a:hover {
                color: #e6b272;
            }
        }
    
        .logout {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
    
        .logout:hover {
            color: #e6b272;
        }
    }
    
    .content {
        flex: 1;
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem;
        padding: 1rem 0.5rem;
        min-height: 10vh;
        /* border-top: 1px solid #E06336; */
    
        p {
            margin: 0;
        }
    }
}
</style>