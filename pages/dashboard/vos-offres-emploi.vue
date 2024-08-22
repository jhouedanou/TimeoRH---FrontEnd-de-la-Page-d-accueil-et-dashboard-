<template>
  <div class="offres-emploi-page">
    <h1 class="title">Offres d'emploi</h1>
    <template>
      <div>
        <div v-if="$route.query.message" class="notification is-success">
          {{ $route.query.message }}
        </div>
        <!-- Reste du contenu de la page -->
      </div>
    </template>

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
