<template>
    <div>
      <button @click="showModal" id="add-expense">Add Expense</button>
      <div class="modal-info">
        <form v-if="isModalOpen" @submit.prevent="addExpense">
          <label>Description</label>
          <input type="text" name="description" v-model="description">
  
          <label>Amount</label>
          <input type="number" name="amount" v-model="amount">
  
          <label>Category</label>
          <select v-model="selectedCategory">
            <option v-for="category in uniqueCategories" :key="category">{{ category }}</option>
            <option value="__add_new__">Add New Category...</option>
          </select>
  
          <!-- Display input for new category if selectedCategory is "__add_new__" -->
          <input type="text" v-if="selectedCategory === '__add_new__'" v-model="newCategory">
  
          <button @click="cancel" class="cancel-button">Cancel</button>
          <button type="submit" class="confirm-button">Save</button>
  
        </form>
      </div>
    </div>
    
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { fetchExpenses } from '../utils/fetchExpenses';
  
  export default {
    setup() {
      const description = ref('');
      const amount = ref('');
      const category = ref('');
      const isModalOpen = ref(false);
      const selectedCategory = ref('');
      const newCategory = ref('');
  
      const expenses = ref([]);
  
      const uniqueCategories = computed(() => {
        return[...new Set(expenses.value.map((expense) => expense.category))];
      })
  
      const addExpense = async () => {
        try { 
          let categoryToAdd = selectedCategory.value;
  
          // If "__add_new__" is selected, use the newCategory input as the category
          if (categoryToAdd === '__add_new__') {
            categoryToAdd = newCategory.value;
          }
  
          const newExpense = {
          description: description.value,
          amount: amount.value,
          category: categoryToAdd
          }
  
          const res = await fetch('https://expense-tracker-api-esx2.onrender.com/api/expenses/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExpense)
          });
  
          if (!res.ok) {
            throw new Error('Network error');
          }
  
          await fetchExpenses();
  
          console.log(expenses.value);
  
          cancel();
        } catch(err) {
          console.log('Error creating an expense:', err);
        }
      };
  
      const showModal = () => {
        isModalOpen.value = true;
      }
  
      const cancel = () => {
        isModalOpen.value = false;
      }
      return {
        description,
        amount,
        category,
        addExpense,
        isModalOpen,
        cancel,
        showModal,
        selectedCategory,
        newCategory,
        uniqueCategories
      }
    }
  }
  </script>
  
  <style>
    .modal-info {
      background-color: #d9d9d9;
      border-radius: 0.5rem;;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    select {
      border: none;
      border-radius: 0.25rem;
      padding: 0.25rem;
    }
    option {
      margin-bottom: 0.25rem;
    }
    #add-expense {
      background-color: #42b983;
    }
  </style>