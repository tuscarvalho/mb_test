<script setup>
import {  computed } from 'vue'

const props = defineProps({
  label: String,
  light: Boolean
})

const customStyle = computed(() => ({
    'default-mode': !props.light,
    'light-mode': props.light
}));

</script>

<template>
    <div>
        <button :class="[customStyle, 'btn']"> {{ props.label }} </button>
    </div>
</template>

<style>
    .btn {
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        padding: .7rem;
        text-transform: capitalize;
        width: 100%;
    }

    .default-mode {
        background-color: var(--primary-color);
        color: white;
    }

    .default-mode:hover {
        opacity: .9;
    }

    .light-mode {
        background-color: white;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
    }
</style>