<template>
    <div class="auth-card">
        <div class="feedback" v-if="loginSuccess === 'success'">
            <h2>Login successful</h2>
        </div>

        <div class="feedback" v-else-if="loginSuccess === 'error'">
            <h2>Login failed</h2>
            <router-link to="/login" @click.prevent="reloadPage">Try again</router-link>
        </div>

        <form @submit.prevent="handleLogin" v-else>
            <h2>Log In</h2>
            <input type="email" id="email" v-model="email" placeholder="Your email" required>
            <input type="password" id="password" v-model="password" placeholder="Your password" required>
            <button type="submit" class="bg-accent">Log in</button>

            <div class="alternatives">
                <p>
                    Forgot password?
                    <router-link to="/reset">Reset password</router-link>
                </p>

                <p>
                    Don't have an account?
                    <router-link to="/">Sign up instead</router-link>
                </p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const { loginSuccess } = storeToRefs(authStore);

const handleLogin = async () => {
    await authStore.login(email.value, password.value);
};

const reloadPage = () => {
    loginSuccess.value = 'loading';
    email.value = '';
    password.value = '';
};
</script>

<style scoped>
.alternatives {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}
</style>