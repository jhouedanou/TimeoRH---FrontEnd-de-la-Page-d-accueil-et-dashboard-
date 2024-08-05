<template>
  <div class="frontend-layout">
    <header>
      <nav>
        <!-- Ajoutez ici la navigation du frontend -->
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <p>© {{ currentYear }} TimeoRH</p>
      <nav>
        <!-- Ajoutez ici les liens du pied de page -->
      </nav>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Ajoutez ici vos styles pour le layout frontend */
</style>
