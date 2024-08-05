<template>
  <DashboardLayout>
    <h2>Liste des recruteurs</h2>
    <ul>
      <li v-for="recruteur in recruteurs" :key="recruteur.id">
        {{ recruteur.nom }} {{ recruteur.prenom }} - {{ recruteur.poste }}
      </li>
    </ul>
  </DashboardLayout>
</template>

<script setup>
import { onMounted } from "vue";
import useRecruteurs from "@/composables/useRecruteurs";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const { recruteurs, fetchRecruteurs } = useRecruteurs();

onMounted(() => {
  fetchRecruteurs();
});
</script>
