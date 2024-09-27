<template>
    <div class="create-budget">
        <h2 @click="openDialog">
            {{ label }}
        </h2>
        <q-icon name="add_circle_outlined" size="sm" @click="openDialog" />
    </div>

    <q-dialog v-model="isDialogOpen">
        <q-card style="width: 30rem; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Create Budget</div>
            </q-card-section>

            <q-card-section>
                <q-input v-model="budget" label="Amount" type="number" />
                <q-select v-model="month" :options="validOptions" label="Month" />
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

const label = ref('Create Budget');
const isDialogOpen = ref(false);
const budget = ref('');
const month = ref('');
const options = [
    { label: 'January', value: '0'},
    { label: 'February', value: '1' },
    { label: 'March', value: '2' },
    { label: 'April', value: '3' },
    { label: 'May', value: '4' },
    { label: 'June', value: '5' },
    { label: 'July', value: '6' },
    { label: 'August', value: '7' },
    { label: 'September', value: '8' },
    { label: 'October', value: '9' },
    { label: 'November', value: '10' },
    { label: 'December', value: '11' },
];

const getCurrentMonth = () => {
    const date = new Date();
    console.log(date.getMonth());
    return date.getMonth();
};

const validOptions = options.filter(option => option.value >= getCurrentMonth());




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
.create-budget {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding-left: 0.5rem;
    
    h2, i {
        cursor: pointer;
    }
}
</style>