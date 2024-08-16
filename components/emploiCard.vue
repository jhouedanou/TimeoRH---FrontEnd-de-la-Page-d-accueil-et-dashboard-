<template>
  <div class="emploi-card">
    <div class="white">
      <img :src="imageHomepage" alt="" />
      <div class="white-content">
        <h3 class="Email-Support-Agent">{{ titre }}</h3>
        <h4>{{ societe }}</h4>
        <p>{{ shortDescription }}</p>
      </div>
      <div class="white-content-2">
        <p>Expérience requise : {{ experienceRequise }}</p>
        <p>Type de contrat : {{ typeDeContrat }}</p>
        <p>Disponibilité : {{ type }}</p>
        <p>Géolocalsation : {{ geolocalisation }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCarouselHomepageEmplois } from "@/composables/useCarouselHomepageEmplois";
import emploiCard from "./emploiCard.vue";
const { data: emploi } = useCarouselHomepageEmplois();

defineProps({
  imageHomepage: String,
  titre: String,
  societe: String,
  shortDescription: String,
  type: String,
  geolocalisation: String,
  experienceRequise: String,
  typeDeContrat: String,
});
</script>

<style scoped></style>
