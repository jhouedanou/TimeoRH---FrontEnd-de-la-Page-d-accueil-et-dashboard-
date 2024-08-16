<template>
  <div>
    <div class="emploi-card" @click="isPopupOpen = true">
      <div class="white">
        <div
          class="headercard"
          :style="{ backgroundImage: `url(${imageHomepage})` }"
        ></div>
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

    <Teleport to="body">
      <div v-if="isPopupOpen" class="popup-overlay">
        <div class="popup-content">
          <h2>Postuler sur l'application</h2>
          <input type="email" v-model="email" placeholder="Votre email" />
          <button @click="isPopupOpen = false">Annuler</button>
          <button @click="sendApplication">Envoyer</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCarouselHomepageEmplois } from "@/composables/useCarouselHomepageEmplois";
import emploiCard from "./emploiCard.vue";
const { data: emploi } = useCarouselHomepageEmplois();

const props = defineProps({
  imageHomepage: String,
  titre: String,
  societe: String,
  shortDescription: String,
  type: String,
  geolocalisation: String,
  experienceRequise: String,
  typeDeContrat: String,
  id: String,
});
const email = ref("");
const isPopupOpen = ref(false);

const sendApplication = () => {
  const subject = encodeURIComponent(`Postuler sur ${props.titre}`);
  const body = encodeURIComponent(
    `com.application.generique://post/${props.id}`
  );
  //remplacer par le nom de l'application
  window.location.href = `mailto:${email.value}?subject=${subject}&body=${body}`;
  isPopupOpen.value = false;
};
</script>

<style lang="scss" scoped>
.emploi-card {
  &:hover {
    cursor: pointer;
  }
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  z-index: 1001;
}
</style>
