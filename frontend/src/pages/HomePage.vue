<template>
    <div class="balance">
        <h2>Hello, Clinton</h2>
        <p>Here is your budget overview</p>
    </div>

    <div class="card mobile-limit">
        <h2>Budget</h2>
        <p>$3000</p>
    </div>
    
    <div class="budget">
        <div class="card limit">
            <h2>Budget</h2>
            <p>$3000</p>
        </div>

        <div class="card spent">
            <h2>Total spent</h2>
            <p>$1000</p>
        </div>

        <div class="card balance">
            <h2>Balance</h2>
            <p>$2000</p>
        </div>
    </div>

    <div class="create-expense">
        <h2>
            Add expense
        </h2>
        <q-icon name="add_circle_outlined" size="sm"></q-icon>
    </div>

    <div class="entries">
        <EntryCard title="Entry 1" price="$100" frequency="Monthly" date="2022-01-01" />
        <EntryCard title="Entry 2" price="$200" frequency="Weekly" date="2022-01-01" />
        <EntryCard title="Entry 3" price="$300" frequency="Yearly" date="2022-01-01" />
    </div>
</template>

<script setup>
import EntryCard from '../components/EntryCard.vue';
</script>

<style scoped>
.balance {
    margin: 1rem;
    padding: 0.5rem;
}

.budget {
    display: flex;
    gap: 1rem;
}

.mobile-limit {
    display: none;
    max-width: 96vw;
}

.create-expense {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    
    h2 {
        padding-bottom: 0.2rem;
    }
}

@media (max-width: 850px) {
    .mobile-limit {
        display: flex;
        max-width: 92vw;
    }

    .limit {
        display: none;
    }
}
</style>