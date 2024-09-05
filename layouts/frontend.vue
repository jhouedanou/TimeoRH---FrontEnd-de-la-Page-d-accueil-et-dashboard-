<template>
  <div class="frontend-layout">
    <home-page-header> </home-page-header>
    <main>
      <slot />
    </main>
    <footer class="footer">
      <div class="columns is-desktop">
        <div
          class="column is-6-desktop is-12-mobile is-flex is-align-items-center is-flex-direction-column is-justify-content-center recruitcolumn"
        >
          <p>© {{ currentYear }} TimeoRH</p>
        </div>
        <div
          class="column is-6-desktop is-12-mobile is-flex is-align-items-center is-flex-direction-column is-justify-content-center recruitcolumn"
        >
          <p>Fait avec ❤️ en Afrique</p>
        </div>
      </div>
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
