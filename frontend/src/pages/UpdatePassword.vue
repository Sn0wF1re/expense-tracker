<template>
    <div class="auth-card">
        <div v-if="updatedPassword === 'success'" class="feedback">
            <h2>Password updated successfully</h2>
            <router-link to="/">Go to login</router-link>
        </div>

        <div v-else-if="updatedPassword === 'error'" class="feedback">
            <h2>Password update failed</h2>
            <router-link to="/reset">Try again</router-link>
        </div>

        <form v-else @submit.prevent="handleUpdate">
            <h2>Update Password</h2>
            <input type="password" id="password" v-model="newPassword" placeholder="Your new password" required>
            <input type="password" id="password" v-model="confirmPassword" placeholder="Confirm new password" required>
            <button type="submit" class="bg-accent">Update</button>
            <router-link to="/">Go to login</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia';

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
const { updatedPassword } = storeToRefs(authStore);

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