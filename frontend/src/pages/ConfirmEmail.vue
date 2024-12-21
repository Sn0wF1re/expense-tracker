<template>
    <div v-if="emailConfirmed=='loading'" class="feedback">
        <h2>Confirming email</h2>
        <p>Please wait...</p>
    </div>

    <div v-else-if="emailConfirmed=='confirmed'" class="auth-card">
        <h2>Email confirmed</h2>
        <p>Click the link below if you are not automatically redirected</p>
        <router-link to="/login">Go to login</router-link>
    </div>
    
    <div v-else-if="emailConfirmed=='error'">
        <h2>Email confirmation failed</h2>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const props = defineProps ({
    token: {
        type: String,
        required: true
    }
});

const confirmationToken = props.token;
const { emailConfirmed } = storeToRefs(authStore);

onMounted(async () => {
    await authStore.confirmEmail(confirmationToken);
});
</script>