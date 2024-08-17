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
          <div class="popup-buttons is-flex is-flex-wrap-wrap">
            <button @click="isPopupOpen = false">Annuler</button>
            <button @click="sendApplication">Envoyer</button>
          </div>
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
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(1, 46, 97, 0.88);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  z-index: 1001;
  .popup-buttons {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    margin: 1em auto;
    width: 100%;
    button {
      flex-grow: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px 15px;
      border-radius: 10px;
      border: solid 1px #e7e6e6;
      background-color: #fafafa;
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #012e61;
      &:hover {
        background-color: #012e61;
        color: #fafafa;
      }
    }
  }
  h2 {
    height: 50px;
    background-color: #012e61;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fafafa;
  }
  input {
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 90%;
    padding: 10px 15px;
    border-radius: 10px;
    border: solid 1px #e7e6e6;
    background-color: #fafafa;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #aba3a9;
    margin: 1em auto;
  }
  button {
    &:nth-of-type(1) {
      width: 166px;
      height: 38px;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 5px;
      border: solid 1px #5e6368;
      font-family: "Poppins", sans-serif;
      font-size: 16px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.06px;
      text-align: left;
      color: #1e1e1e;
    }
    &:nth-of-type(2) {
      width: 166px;
      height: 38px;
      background-color: #012e61;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 5px;
      border: solid 1px #5e6368;
      font-family: "Poppins", sans-serif;
      font-size: 16px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.06px;
      text-align: left;
      color: white;
    }
  }
}
</style>
