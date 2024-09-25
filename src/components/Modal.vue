<script setup>
const props = defineProps({
    status: String
});
</script>

<template>
    <main :class="[props.status === 'success' ? 'modal_success' : 'modal_error']">
        <h3><slot name="message" /></h3>
    </main>
</template>

<style>
    .modal_success {
        align-items: center;
        background-color: var(--bg-color-success);
        color: var(--success-color);
        display: flex;
        height: 80px;
        justify-content: center;
        margin: 0;
        position: fixed;
        width: 100vw;
        left: 0;
        top: 0;
    }

    .modal_error {
        align-items: center;
        background-color: var(--bg-color-error);
        color: white;
        display: flex;
        height: 80px;
        justify-content: center;
        margin: 0;
        position: fixed;
        width: 100vw;
        left: 0;
        top: 0;
    }
</style>
