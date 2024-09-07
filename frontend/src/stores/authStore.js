// src/stores/authStore.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(null);
  const router = useRouter();
  const apiUrl = 'http://localhost:3000/api/v1/auth';

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
      token.value = data.accessToken;
      user.value = data;
      console.log('User:', user.value);
      LocalStorage.set('token', data.accessToken);
      router.push('/home');
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

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    router.push('/login');
  };

  return {
    user,
    token,
    login,
    register,
    logout,
  };
});