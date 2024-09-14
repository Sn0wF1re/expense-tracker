<template>
    <router-link :to="{ name: 'category', params: { categoryId: category._id} }">
        <div class="entry">
            <div class="description">
                <h2>
                    {{ category.name }}
                </h2>
                <!-- <div class="actions">
                    <q-icon name="edit_sharp" size="sm" />
                    <q-icon name="delete_sharp" size="sm" />
                </div> -->
            </div>
    
            <div class="entry-content text-positive">
                <p v-if="category.expenses.length === 1">1 expense</p>
                <p v-else-if="category.expenses.length === 0">0 expenses</p>
                <p v-else>{{ category.expenses.length }} expenses</p>
            </div>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps({
    category: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}
.entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0.25rem 0.5rem;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    /* .entry-header {
        display: flex;
        justify-content: space-between;
        align-items: center; */

    .description {
        display: flex;
        flex-direction: column;
        /* .actions {
            display: flex;
            gap: 0.5rem;
            cursor: pointer;
        } */
    }
    h2 {
        margin: 0;
    }
    p {
        margin: 0;
        /* color: #FFA259; */
    }

    .entry-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>