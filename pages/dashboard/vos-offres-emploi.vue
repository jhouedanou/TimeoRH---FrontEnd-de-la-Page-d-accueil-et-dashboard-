<template>
  <div class="offres-emploi-page">
    <h1 class="title">Offres d'emploi</h1>
    <OffresEmploi />
  </div>
</template>

<script setup>
import OffresEmploi from "@/components/OffresEmploi.vue";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
</script>
