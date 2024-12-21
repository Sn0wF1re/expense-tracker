<template>
    <div class="entry">
        <div class="entry-header">
            <div class="description">
                <h2 class="description-text">
                    {{ entry.description }}
                </h2>

                <div class="actions">
                    <q-icon name="edit_sharp" size="sm" />
                    <q-icon name="delete_sharp" size="sm" />
                </div>
            </div>
            <p class="price text-negative">- Kes {{ entry.amount }}</p>
        </div>

        <div class="mobile-entry-header">
            <h2 class="description-text">
                {{ entry.description }}
            </h2>

            <div class="mobile-description">
                <div class="mobile-actions">
                    <q-icon name="edit_sharp" size="sm" />
                    <q-icon name="delete_sharp" size="sm" />
                </div>

                <p class="price text-negative">- Kes {{ entry.amount }}</p>
            </div>
        </div>

        <div class="entry-content">
            <p>{{ entry.category }}</p>
            <p>{{ formattedDate }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    entry: {
        type: Object,
        required: true
    }
});

const formattedDate = computed(() => {
    const date = new Date(props.entry.date);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});
</script>

<style scoped>

.entry {
    background-color: #fff;
    padding: 0.25rem 0.5rem;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .mobile-entry-header {
        display: none;
    }

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
            /* color: #FFA259; */
        }
    }

    .entry-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666;
    }
}

@media (max-width: 850px) {
    .entry {
        .entry-header {
            display: none;
        }

        .mobile-entry-header {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .mobile-description {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 6rem;

                .mobile-actions {
                    display: flex;
                    cursor: pointer;
                }
            }

            h2 {
                margin: 0;
            }

            p {
                margin: 0;
            }
        }
    }
}
</style>