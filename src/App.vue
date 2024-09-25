<script setup>
import CreateView from './views/User/CreateView.vue';
</script>

<template>
   <main class="wrapper">
      <div class="wrapper__form">
        <CreateView></CreateView>
      </div>

   </main>
</template>

<style scoped>

.wrapper {
  width: 100%;
}

.wrapper__form {
  margin: 0 auto;
  width: 330px;
}
</style>
