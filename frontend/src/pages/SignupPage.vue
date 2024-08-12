<template>
    <div class="container">
      <div class="register">
        <p>Sign up to create an account</p>
        <button class="red-button">Sign Up</button>
      </div>

      <div class="login">
        <p>Already have an account?</p>
        <button class="red-button">Log In</button>
      </div>

      <form @submit.prevent="submitForm">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>

      <form @submit.prevent="submitForm">
        <input v-model="firstName" type="text" placeholder="First Name" />
        <input v-model="lastName" type="text" placeholder="Last Name" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const submitForm = () => {
  // Your signup logic here
  console.log(`Username: ${username.value}, Password: ${password.value}`);
};
</script>
<style scoped>
  .container {
    background-color: #d4f776;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .red-button {
      background-color: #E06336;
      color: #f0f0f0;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        text-align: center;
        border: #f0f0f0 1px solid;
      }

      button {
        background-color: #E06336;
        color: #f0f0f0;
      }
    }
  }
</style>