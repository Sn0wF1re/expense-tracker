<template>
    <div class="forms">
        <div class="card bg-accent">
            <AddBudgetForm />
        </div>

        <div class="card bg-accent">
            <AddCategoryForm />
        </div>
    </div>

    <h2>Categories</h2>

    <div class="entries bg-primary">
        <div v-if="categories.length === 0" class="loading">
            <p class>No categories found</p>
        </div>

        <div v-else>
            <CategoryEntry v-for="category in categories" :category="category" :key="category.id" />
        </div>
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
.forms {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

h2 {
    margin: 1.2rem;
}

@media (max-width: 850px) {
    .forms {
        flex-direction: column;
        gap: 1rem;

        .card {
            width: 92vw;
        }
    }
}
</style>