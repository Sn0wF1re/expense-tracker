<template>
    <!-- <div class="create-expense">
        <h2>{{ label }}</h2> 
        <q-icon name="add_circle_outlined" size="sm" />
        <q-popup-edit v-model="label" auto-save v-slot="scope" buttons>
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
    </div> -->
    <div class="create-expense">
        <h2 @click="openDialog">
            {{ label }}
        </h2>
        <q-icon name="add_circle_outlined" size="sm" @click="openDialog" />
    </div>

    <q-dialog v-model="isDialogOpen">
        <q-card style="width: 30rem; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Add Expense</div>
            </q-card-section>

            <q-card-section>
                <q-select v-model="expenseCategory" label="Category" :options="options" />
                <q-input v-model="expenseDescription" label="Description" />
                <q-input v-model="expenseAmount" label="Amount" type="number" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Add" color="primary" @click="addExpense" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useExpensesStore } from '../stores/expensesStore';
import { useCategoriesStore } from '../stores/categoriesStore';

const expensesStore = useExpensesStore();
const categoriesStore = useCategoriesStore();
const label = ref('Add Expense');
const isDialogOpen = ref(false);
const expenseCategory = ref('');
const expenseDescription = ref('');
const expenseAmount = ref('');
const { categories } = storeToRefs(categoriesStore);
const options = categories.value.map(category => category.name);

const addExpense = () => {
    // Handle adding expense logic here 
    expensesStore.addExpense({
        category: expenseCategory.value,
        description: expenseDescription.value,
        amount: expenseAmount.value
    });
    
    console.log('Expense added:', expenseCategory.value, expenseAmount.value);
    isDialogOpen.value = false;
};

const openDialog = () => {
  isDialogOpen.value = true;
};

onMounted(() => {
    categoriesStore.fetchCategories();
});
</script>

<style scoped>
.create-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    
    h2, i {
        cursor: pointer;
        /* color: #E6B272; */
    }

    h2:hover{
        color: #e6b272;
    }
}

.create-expense:hover {
    color: #e6b272;
}
</style>