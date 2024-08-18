<template>
  <div class="dashboard-layout">
    <DashboardHeader />
    <div class="container dashboard-container">
      <main class="dashboard-content">
        <div class="columns">
          <div class="column column is-2-desktop is-2-tablet is-12-mobile">
            <DashboardSidebar />
          </div>
          <div class="column column is-10-desktop is-10-tablet is-12-mobile">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Ajoutez ici vos styles pour le layout dashboard */
.dashboard-content {
  margin-top: 5px;
}
</style>
