<template>
  <div class="dashboard-layout">
    <header>
      <h1>TimeoRH Dashboard</h1>
      <nav><!-- Ajoutez ici la navigation du dashboard --></nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>© {{ currentYear }} TimeoRH</footer>
  </div>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Ajoutez ici vos styles pour le layout dashboard */
</style>
