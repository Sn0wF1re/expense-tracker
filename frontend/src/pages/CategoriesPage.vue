<template>
    <div class="budget">
        <AddBudgetForm />
    </div>

    <div class="categories">
        <AddCategoryForm />
    </div>

    <div class="entries">
        <h2>Expense Categories</h2>
        <CategoryEntry name="Fuel" date="2022-01-01" />
    </div>
</template>

<script setup>
import AddCategoryForm from '../components/AddCategoryForm.vue';
import AddBudgetForm from '../components/AddBudgetForm.vue';
import CategoryEntry from '../components/CategoryEntry.vue';
</script>

<style scoped>
.entries {
    h2 {
        margin: 1.2rem;
    }
}
</style>