<template>
    <div class="budget">
        <AddBudgetForm />
    </div>

    <div class="categories">
        <AddCategoryForm />
    </div>

    <div class="entries">
        <h2>Expense Categories</h2>
        <CategoryEntry v-for="category in categories" :category="category" :key="category.id" />
    </div>
</template>

<script setup>
import AddCategoryForm from '../components/AddCategoryForm.vue';
import AddBudgetForm from '../components/AddBudgetForm.vue';
import CategoryEntry from '../components/CategoryEntry.vue';
import { useCategoriesStore } from '../stores/categoriesStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { LocalStorage } from 'quasar';

const categoriesStore = useCategoriesStore();
const { categories } = storeToRefs(categoriesStore);

onMounted(() => {
    console.log(LocalStorage.getItem('token'));
    categoriesStore.fetchCategories();
});
</script>

<style scoped>
.entries {
    h2 {
        margin: 1.2rem;
    }
}
</style>