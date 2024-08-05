<template>
  <div class="login-layout">
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
/* Ajoutez ici vos styles pour le layout de connexion */
</style>
