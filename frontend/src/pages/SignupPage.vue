<template>
    <div class="auth-card">
        <div v-if="registrationSuccess === 'success'" class="feedback">
            <h2>Registration successful</h2>
            <p>Please check your email to verify your account.</p>
            <router-link to="/">Go to login</router-link>
        </div>

        <div v-else-if="registrationSuccess === 'error'" class="feedback">
            <h2>Registration failed</h2>
            <router-link to="/register">Try again</router-link>
        </div>

        <form v-else @submit.prevent="handleRegistration">
            <h2>Sign Up</h2>

            <input v-model="firstName" type="text" placeholder="Your first name" id="first-name">

            <input v-model="lastName" type="text" placeholder="Your last name" id="last-name">

            <input v-model="email" type="text" placeholder="Your email" id="email">

            <input v-model="password" type="password" placeholder="Your password" id="password">
            <button type="submit" class="bg-accent">Sign up</button>
            <p>
                Already have an account?
                <router-link to="/">Log in instead</router-link>
            </p>
        </form>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const { registrationSuccess } = storeToRefs(authStore);

const handleRegistration = async () => {
    await authStore.register(firstName.value, lastName.value, email.value, password.value);
};

</script>

<style scoped>
</style>