<template>
    <div class="auth-card">
        <form @submit.prevent="handleRegistration">
            <h2>Sign Up</h2>

            <input v-model="firstName" type="text" placeholder="Your first name" id="first-name">

            <input v-model="lastName" type="text" placeholder="Your last name" id="last-name">

            <input v-model="email" type="text" placeholder="Your email" id="email">

            <input v-model="password" type="password" placeholder="Your password" id="password">
            <button type="submit">Sign up</button>
            <p>
                Already have an account?
                <router-link to="/login">Log in instead</router-link>
            </p>
        </form>
    </div>
</template>

<script setup>
// import { supabase } from '../lib/supabaseClient';
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
// import { useRouter } from 'vue-router';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

// const router = useRouter();

const handleRegistration = async () => {
    await authStore.register(firstName.value, lastName.value, email.value, password.value);
};

// const handleRegistration = async () => {
//     try {
//         const {data, error} = await supabase.auth.signUp({
//             email: email.value,
//             password: password.value,
//             options: {
//                 emailRedirectTo: 'http://localhost:5173/login',
//                 data: {
//                     first_name: firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1).toLowerCase(),
//                     last_name: lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1).toLowerCase()
//                 }
//             }
//         })

//         if (error) {
//             console.log(error.message);
//         }
//         else {
//             console.log('data:', data);
//             router.push('/login');
//         }
//     }catch (error){
//         console.log('Error encountered:', error);
//     }
// };

</script>

<style scoped>
</style>