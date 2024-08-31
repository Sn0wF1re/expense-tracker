<template>
    <div class="entry">
        <div class="entry-header">
            <h2>{{ title }}</h2>
            <p>{{ price }}</p>
        </div>

        <div class="entry-content">
            <p>{{ frequency }}</p>
            <p>{{ date }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['title', 'price', 'frequency', 'date']);
</script>

<style scoped>
.entry {
    background-color: #f0f0f0;
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .entry-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            margin: 0;
        }
        p {
            margin: 0;
            color: #E06336;
        }
    }

    .entry-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>