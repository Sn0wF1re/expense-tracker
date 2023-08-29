<template>
  <div>
    <h1>Track your Expenses Easily</h1>
    <AddExpenseModal />
    <h2>Expenses:</h2>
    <div class="grid-container">
      <ul>
        <li v-for="expense in expenses" :key="expense._id" class="expense-card">
          <span><b>Category:</b> {{ expense.category }}&nbsp;</span>
          <span><b>Amount:</b> {{ expense.amount }}&nbsp;</span>
          <span><b>Description:</b> {{ expense.description }}</span>
          <button @click="showUpdateExpenseModal(expense)" class="update-button">Update</button>
          <button @click="showDeleteConfirmation(expense)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-if="showUpdateExpense" class="modal-overlay">
      <form @submit.prevent="updateExpense" class="update">
        <label>Description</label>
        <input type="text" v-model="updatedExpense.description" required>

        <label>Amount</label>
        <input type="number" v-model="updatedExpense.amount" required>

        <label>Category</label>
        <input type="text" v-model="updatedExpense.category" required>

        <button @click="cancelUpdate" class="cancel-button">Cancel</button>
        <button type="submit" class="update-button">Update</button>
      </form>
    </div>

    <div v-if="showConfirmDeleteModal" class="modal-overlay">
      <p>Are you sure you want to delete this expense?</p>
      <button @click="deleteExpense" class="confirm-button">Confirm</button>
      <button @click="cancelDelete" class="cancel-button">Cancel</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { fetchExpenses } from '../utils/fetchExpenses';
import AddExpenseModal from '@/components/AddExpenseModal.vue';

export default {
  components: {
    AddExpenseModal,
  },
  setup() {
    const expenses = ref([]);
    const showConfirmDeleteModal = ref(false);
    const expenseToDelete = ref(null);
    const expenseToUpdate = ref(null);
    const showUpdateExpense = ref(false);
    const updatedExpense = ref({ description: '', category: '', amount: 0 });

    const fetchExpensesData = async () => {
      try {
        expenses.value = await fetchExpenses();
      } catch (err) {
        console.log('Error fetching expenses:', err)
      }
    }

    const showDeleteConfirmation = (expense) => {
      expenseToDelete.value = expense;
      showConfirmDeleteModal.value = true;
    }

    const deleteExpense = async () => {
      if (expenseToDelete.value) {
        const res = await fetch(`http://localhost:3000/api/expenses/${expenseToDelete.value._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          expenses.value = expenses.value.filter(
            (expense) => expense._id !== expenseToDelete.value._id
          );
          cancelDelete();
        } else {
          console.log('Error deleting expense');
        }
      }
    };

    const cancelDelete = () => {
      showConfirmDeleteModal.value = false;
      expenseToDelete.value = null;
    };

    const showUpdateExpenseModal = (expense) => {
      expenseToUpdate.value = expense;
      updatedExpense.value = { ...expense };
      showUpdateExpense.value = true;
    };

    const updateExpense = async () => {
      if (updatedExpense.value) {
        const res = await fetch(
          `http://localhost:3000/api/expenses/${updatedExpense.value._id}`, 
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExpense.value)
          }
        );

        if (res.ok) {
          await fetchExpensesData();
          cancelUpdate();
        } else {
          console.error('Error updating expense');
        }
      }
    };

    const cancelUpdate = () => {
      showUpdateExpense.value = false;
      expenseToUpdate.value = null;
      updatedExpense.value = null;
    };

    onMounted (() => {
      fetchExpensesData();
    });

    return { 
      expenses,
      showConfirmDeleteModal,
      showDeleteConfirmation,
      deleteExpense,
      cancelDelete,
      showUpdateExpense,
      showUpdateExpenseModal,
      updatedExpense,
      updateExpense,
      cancelUpdate
    };
  },
};
</script>

<style>
  .modal-overlay p {
    color: black;
  }

  li {
    list-style: none;
  }

  form {
    padding: 1rem;
  }

  input {
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem;
    margin: 0.5rem;
  }

  .modal-overlay {
    background-color: #d9d9d9;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
  }

  label, input {
    display: block;
  }

  label {
    text-align: left;
    margin: 0.5rem 0;
  }

  .grid-container {
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .expense-card {
    display: flex;
    flex-direction: column;
    background: #d9d9d9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    justify-content: space-between;
    padding: 1rem;
    border-radius: 8px;
    margin: 0.5rem 0.25rem;
  }

  button {
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    margin: 0.5rem;
    cursor: pointer;
    color: white;
  }

  .expense-card button {
    background-color: #e74c3c;
    color: white;
    max-width: 50%;
    align-self: center;
  }

  .update-button, .expense-card .update-button {
    background-color: cornflowerblue;
  }

  .confirm-button {
    background-color: blue;
  }

  .cancel-button {
    background-color: black;
  }
</style>