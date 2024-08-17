<template>
  <div>
    <h1>Tableau de bord</h1>
    <!-- Ajoutez ici le contenu de votre tableau de bord -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
</script>

<style scoped>
/* Ajoutez ici vos styles spécifiques à cette page */
</style>
