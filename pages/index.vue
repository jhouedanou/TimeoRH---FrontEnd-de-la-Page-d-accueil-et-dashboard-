<script setup>
import { useindex } from "/composables/index";
import FrontendLayout from "/layouts/frontend.vue";
const { content } = useindex();
</script>

<template>
  <FrontendLayout>
    <div class="container"></div>
  </FrontendLayout>
</template>
