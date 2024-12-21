<template>
    <div class="auth-card">
        <div class="feedback" v-if="resetSuccess === 'success'">
            <h2>Password reset successful</h2>
            <p>Check your email for the reset link</p>
            <router-link to="/login">Go back to login</router-link>
        </div>

        <div class="feedback" v-else-if="resetSuccess === 'error'">
            <h2>Password reset failed</h2>
            <router-link to="/reset">Try again</router-link>
        </div>

        <form v-else @submit.prevent="handleReset">
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
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const email = ref('');
const { resetSuccess } = storeToRefs(authStore);

const handleReset = async () => {
    await authStore.requestPasswordReset(email.value);
};
</script>

<style scoped>
</style>