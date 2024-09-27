// src/stores/authStore.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { Cookies } from 'quasar';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const baseUrl = meta.env.VITE_BASE_URL;
  const apiUrl = `${baseUrl}/api/v1/auth`;
  const emailConfirmed = ref('loading');
  const resetSuccess = ref('loading');
  const updatedPassword = ref('loading');
  const registrationSuccess = ref('loading');
  const loginSuccess = ref('loading');

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
      loginSuccess.value = 'success';
      Cookies.set('token', data.accessToken, {
        secure: true
      });
      Cookies.set('firstName', data.firstName);
      router.push('/app/expenses');
    } catch (error) {
      loginSuccess.value = 'error';
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
      registrationSuccess.value = 'success';
    } catch (error) {
      registrationSuccess.value = 'error';
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
      resetSuccess.value = 'success';
    } catch (error) {
      resetSuccess.value = 'error';
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
      updatedPassword.value = 'success';
    } catch (error) {
      console.error('Password reset failed:', error.message);
      updatedPassword.value = 'error';
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('firstName');
    window.location.href = '/login';
  };

  return {
    emailConfirmed,
    resetSuccess,
    updatedPassword,
    registrationSuccess,
    loginSuccess,
    login,
    register,
    confirmEmail,
    requestPasswordReset,
    updatePassword,
    logout,
  };
});