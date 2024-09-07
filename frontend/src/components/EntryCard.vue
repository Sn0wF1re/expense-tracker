<template>
    <div class="entry">
        <div class="entry-header">
            <div class="description">
                <h2>
                    {{ description }}
                </h2>

                <div class="actions">
                    <q-icon name="edit_sharp" size="sm" />
                    <q-icon name="delete_sharp" size="sm" />
                </div>
            </div>
            <p>{{ price }}</p>
        </div>

        <div class="entry-content">
            <p>{{ category }}</p>
            <p>{{ date }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['description', 'price', 'category', 'date']);
</script>

<style scoped>
.entry {
    background-color: #f0f0f0;
    padding: 0.25rem 0.5rem;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .entry-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .description {
            display: flex;
            align-items: center;
            gap: 6rem;

            .actions {
                display: flex;
                gap: 0.5rem;
                cursor: pointer;
            }
        }

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