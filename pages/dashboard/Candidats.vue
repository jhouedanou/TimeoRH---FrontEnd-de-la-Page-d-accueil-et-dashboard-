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

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import useCandidats from "@/composables/useCandidats";

export default defineComponent({
  setup() {
    const { candidats, fetchCandidats } = useCandidats();

    fetchCandidats();

    return { candidats };
  },
});
</script>
