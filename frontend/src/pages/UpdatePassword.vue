<template>
    <div class="auth-card">
        <form @submit.prevent="handleUpdate">
            <h2>Update Password</h2>
            <input type="text" id="password" v-model="newPassword" placeholder="Your new password" required>
            <input type="text" id="password" v-model="confirmPassword" placeholder="Confirm new password" required>
            <button type="submit" class="bg-accent">Update</button>
            <router-link to="/login">Go to login</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const props = defineProps ({
    token: {
        type: String,
        required: true
    }
});
const newPassword = ref('');
const confirmPassword = ref('');
const authStore = useAuthStore();

const resetToken = props.token;

const handleUpdate = async () => {
    if (newPassword.value !== confirmPassword.value) {
        alert('Passwords do not match');
        return;
    }
    await authStore.updatePassword(resetToken, newPassword.value);
};
</script>

<style scoped>
</style>