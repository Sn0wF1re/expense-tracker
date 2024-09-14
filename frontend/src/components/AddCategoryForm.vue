<template>
    <div class="create-category">
        <h2 @click="openDialog">
            {{ label }}
        </h2>
        <q-icon name="add_circle_outlined" size="sm" @click="openDialog" />
    </div>

    <q-dialog v-model="isDialogOpen">
        <q-card style="width: 30rem; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Add Category</div>
            </q-card-section>

            <q-card-section>
                <q-input v-model="expenseCategory" label="Name" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Add" color="primary" @click="addExpense" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

const label = ref('Add Category');
const isDialogOpen = ref(false);
const expenseCategory = ref('');

const addExpense = () => {
  // Handle adding expense logic here
  console.log('Expense added:', expenseName.value, expenseAmount.value);
  isDialogOpen.value = false;
};

const openDialog = () => {
  isDialogOpen.value = true;
};
</script>

<style scoped>
.create-category {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding-left: 0.5rem;
    
    h2, i {
        cursor: pointer;
    }

    h2:hover {
        color: #e6b272;
    }
}

.create-category:hover {
    color: #e6b272;
}
</style>