<template>
  <div class="planifier-recrutement">
    <div v-if="emploi">
      <h2 id="bing">Candidatures pour le poste {{ emploi.titre }}</h2>
      <div v-for="candidature in candidaturesAffichees" :key="candidature.id">
        <Candidat
          :candidat="candidature.candidat"
          :adequation="candidature.adequation"
        />
      </div>
      <button class="ericDraven" v-if="afficherPlus" @click="chargerPlus">
        Afficher plus
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Candidat from "@/components/Candidat.vue";
import { useEmploisJson } from "@/composables/useEmplois";
import { useCandidatsJson } from "@/composables/useCandidats";

const route = useRoute();
const emploiId = parseInt(route.params.id);
const { data: emplois } = useEmploisJson();
const { data: candidats } = useCandidatsJson();

const emploi = computed(() => emplois.value.find((e) => e.id === emploiId));
const candidatures = computed(() => {
  if (!emploi.value) return [];
  return emploi.value.candidatures.map((c) => ({
    ...c,
    candidat: candidats.value.find(
      (candidat) => candidat.candidat_id === c.candidat_id
    ),
  }));
});

// Tri des candidatures par adéquation
const candidaturesTries = computed(() => {
  return [...candidatures.value].sort((a, b) => b.adequation - a.adequation);
});

const nombreAffiche = ref(3);
const candidaturesAffichees = computed(() => {
  return candidaturesTries.value.slice(0, nombreAffiche.value);
});

const afficherPlus = computed(() => {
  return nombreAffiche.value < candidaturesTries.value.length;
});

const chargerPlus = () => {
  nombreAffiche.value += 3;
};
</script>

<style lang="scss">
.ericDraven {
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 26px;
  margin: 0 auto 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
#bing {
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  padding: 1em;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.8;
  letter-spacing: 0.4px;
  text-align: left;
  color: #dc9756;
}
</style>
