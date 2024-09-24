<template>
    <div class="auth-card">
        <form @submit.prevent="handleReset">
            <h2>Reset Password</h2>
            <input type="email" id="email" v-model="email" placeholder="Your email" required>
            <button type="submit" class="bg-accent">Reset</button>
            <router-link to="/login">Go back to login</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const email = ref('');
const handleReset = async () => {
    await authStore.requestPasswordReset(email.value);
};
</script>

<style scoped>
</style>