<script setup>
const props = defineProps({
    title: String,
    currentStep: Number,
    endStep: Number
});

</script>

<template>
    <div>
        <span class="step-description">Etapa <b class="current-step">{{ props.currentStep }} </b> de {{ props.endStep }} </span>
        <h2>{{ props.title }}</h2>
    </div>
</template>

<style>
    .step-description {
        font-size: .9rem;
    }
    .current-step {
        color: var(--primary-color);
    }
</style>