<template>
  <div>
    <h1>Learning Center</h1>
    <!-- Ajoutez ici le contenu de votre tableau de bord -->
    <DashboardSidebar />
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
/* Ajoutez ici vos styles spécifiques à cette page */
</style>
