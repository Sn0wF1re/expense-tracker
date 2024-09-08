<template>

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

        <div class="entry-content">
            <p v-if="category.expenses.length === 1">1 expense</p>
            <p v-else>{{ category.expenses.length }} expenses</p>
        </div>
    </div>
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
.entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
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
        color: #E06336;
    }

    .entry-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>