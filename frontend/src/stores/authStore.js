// src/stores/authStore.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const apiUrl = 'http://localhost:3000/api/v1/auth';
  const emailConfirmed = ref('loading');

  const login = async (email, password) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      console.log('Login successful:', data);
      // token.value = data.accessToken;
      // user.value = data;
      // console.log('User:', user.value);
      LocalStorage.set('token', data.accessToken);
      LocalStorage.set('firstName', data.firstName);
      router.push('/expenses');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const register = async(firstName, lastName, email, password) => {
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      console.log('Registration successful:', data);
      // Optionally, log the user in after registration
      await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const confirmEmail = async (token) => {
    try {
      await fetch(`${apiUrl}/confirm/${token}`);
      emailConfirmed.value = 'confirmed';
      router.push('/login');
    } catch (error) {
      console.error('Email confirmation failed:', error.message);
      emailConfirmed.value = 'error';
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      await fetch(`${apiUrl}/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
    } catch (error) {
      console.error('Password reset request failed:', error.message);
    }
  };

  const updatePassword = async (token, newPassword) => {
    // Implement password reset
    try {
      await fetch(`${apiUrl}/reset/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      });
    } catch (error) {
      console.error('Password reset failed:', error.message);
    }
  };

  const logout = () => {
    LocalStorage.remove('token');
    LocalStorage.remove('firstName');
    router.push('/login');
  };

  return {
    login,
    register,
    confirmEmail,
    requestPasswordReset,
    updatePassword,
    logout,
  };
});