<template>
  <div>
    <h1>Shortlist des candidats</h1>
    <div v-for="emploi in emploisAvecCandidatsRetenus" :key="emploi.id">
      <h2>{{ emploi.titre }}</h2>
      <Candidat v-for="candidature in emploi.candidaturesRetenues" :key="candidature.candidat_id"
        :candidat="candidature.candidat" :adequation="candidature.adequation" :emploiId="emploi.id" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useEmploisJson } from '@/composables/useEmplois';
import Candidat from '@/components/Candidat.vue';

const { data: emplois } = useEmploisJson();

const emploisAvecCandidatsRetenus = computed(() => {
  return emplois.value.map(emploi => ({
    ...emploi,
    candidaturesRetenues: emploi.candidatures.filter(c => c.estretenu)
  })).filter(emploi => emploi.candidaturesRetenues.length > 0);
});
</script>
