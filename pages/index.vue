<script setup>
import FrontendLayout from "/layouts/frontend.vue";
import { useHead } from "#app";
useHead({
  title: "TimeoRH - Accueil",
});
</script>

<template>
  <FrontendLayout>
    <Hero />
    <homepagejobs :limit="6" />
    <homepageRecruteurs />
    <homepageActualites :limit="3" />
  </FrontendLayout>
</template>
