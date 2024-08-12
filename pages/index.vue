<script setup>
import FrontendLayout from "/layouts/frontend.vue";
</script>

<template>
  <FrontendLayout>
    <Hero />
    <homepagejobs :limit="6" />
  </FrontendLayout>
</template>
