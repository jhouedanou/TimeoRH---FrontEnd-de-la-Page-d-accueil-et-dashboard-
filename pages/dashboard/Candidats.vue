<template>
  <div>
    <h2>Liste des candidats</h2>
    <ul>
      <li v-for="candidat in candidats" :key="candidat.id">
        {{ candidat.nom }} {{ candidat.prenom }} - {{ candidat.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import useCandidats from "@/composables/useCandidats";

const { candidats, fetchCandidats } = useCandidats();

onMounted(() => {
  fetchCandidats();
});
</script>
