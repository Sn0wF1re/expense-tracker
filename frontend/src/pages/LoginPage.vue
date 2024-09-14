<template>
    <div class="auth-card">
        <form @submit.prevent="handleLogin">
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
// import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
    await authStore.login(email.value, password.value);
};

// const handleLogin = async () => {
//     try {
//         const { data, error } = await supabase.auth.signInWithPassword({
//             email: email.value,
//             password: password.value
//         })

//         if (error) {
//             console.log(error.message);
//             alert('Wrong email or password');
//         } else {
//             console.log('data:', data)
//             router.push('/tasks');
//         }
//     } catch (error) {
//         console.log('Error encountered while logging in:', error);
//     }
// };
</script>

<style scoped>
.alternatives {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}
</style>