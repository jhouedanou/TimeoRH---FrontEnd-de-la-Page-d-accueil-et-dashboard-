<template>
  <div class="candidat">
    <div class="columns">
      <div class="column is-10-desktop is-12-mobile">
        <div class="candidat-info">
          <div class="theez is-flex">
            <div class="onez">
              <img :src="candidat.image" :alt="candidat.nom" />
            </div>
            <div class="twoz">
              <h3>{{ candidat.nom }} {{ candidat.prenom }}</h3>
              <p class="titre">{{ candidat.titre }}</p>
              <div class="nfo">
                <p>Expérience: {{ candidat.experience }} ans</p>

                <p>Email: {{ candidat.email }}</p>
                <p>Téléphone: {{ candidat.telephone }}</p>
                <p>Date d'inscription: {{ candidat.dateInscription }}</p>
                <p>Géolocalisation: {{ candidat.geolocalisation }}</p>
              </div>
            </div>
          </div>
          <div class="skills-container">
            <span
              v-for="(point, index) in candidat.points_forts"
              :key="index"
              class="skill-button"
            >
              {{ point }}
            </span>
          </div>
          <div class="points-forts">
            <h4>Points forts</h4>
            <p>{{ candidat.appreciation }}</p>
          </div>
        </div>

        <div class="competences">
          <!-- <h4>Compétences</h4> -->
          <div class="skills-container">
            <span
              v-for="(competence, index) in candidat.competences"
              :key="index"
              class="skill-button"
            >
              {{ competence }}
            </span>
          </div>
        </div>
      </div>
      <div class="column is-2-desktop is-12-mobile madjoua">
        <p :class="['levraimatch', matchColorClass]">
          Match à {{ adequation }} %
        </p>

        <NuxtLink
          class="andrewtateisanidiot"
          :to="`/dashboard/cv/${candidat.candidat_id}`"
          >Afficher le CV</NuxtLink
        >
        <CV :candidat="candidat" :adequation="adequation" />
        <div v-if="showPopup" class="popup">
          <div class="popup-content">
            <button @click="showPopup = false">Fermer</button>
            <CV :candidat="candidat" :adequation="adequation" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
import { computed, ref } from "vue";
const showPopup = ref(false);

import { useEmploisJson } from "@/composables/useEmplois";
import { useCandidatsJson } from "@/composables/useCandidats";
const props = defineProps({
  candidat: Object,
  adequation: {
    type: Number,
    required: true,
  },
});

const matchColorClass = computed(() => {
  if (props.adequation >= 80) return "match-green";
  if (props.adequation >= 60) return "match-orange";
  return "match-red";
});
</script>

<style lang="scss" scoped>
popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
}
.candidat {
  /* Styles pour le conteneur du candidat */
}

.candidat-info {
  /* Styles pour les informations du candidat */
}
.andrewtateisanidiot {
  justify-content: flex-end;
  font-size: 25px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: right;
  color: #012e61;
  &:hover {
    text-decoration: underline;
  }
}
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-button {
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
  background-color: #f3f3f3;
  font-size: 16px;
  font-weight: bold;
  color: #002160;
}
.candidat {
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  border: solid 1px #f3f3f3;
  background-color: #fff;
  margin-bottom: 4em;
  padding: 1.5em;
}
.onez {
  margin-bottom: 2em;
  img {
    object-fit: cover;
  }
}
.twoz {
  padding: 0 1em;
  h3 {
    font-size: 25px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    margin-bottom: 0.5em;
  }
  .titre {
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #a4a4a4;
    margin-bottom: 0.5em;
  }
}
.nfo {
  margin-bottom: 0.5em;

  p {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.9;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
  }
}
.skills-container {
  margin-bottom: 1.5em;
}
.points-forts {
  margin-bottom: 1.5em;
  h4 {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    margin-bottom: 0.5em;
  }
  p {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.9;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    margin-bottom: 0.5em;
  }
}
.levraimatch {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.9;
  letter-spacing: normal;
  text-align: right;
  &::after {
    position: absolute;
    z-index: 10;
  }
  &.match-green {
    color: green;
    &::after {
      content: "";
      display: block;
      height: 36px;
      width: 36px;
      background: url("/images/100.svg");
    }
  }
  &.match-orange {
    color: orange;
    &::after {
      display: block;
      content: "";
      height: 36px;
      width: 36px;
      background: url("/images/101.svg");
    }
  }
  &.match-red {
    color: red;
    &::after {
      display: block;
      content: "";
      height: 36px;
      width: 36px;
      background: url("/images/102.svg");
    }
  }
}
.madjoua {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1.5em;
  flex-flow: row;
  flex-wrap: wrap;
  position: relative;
  p {
    width: 90%;
    height: 45px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    position: relative;
    &::after {
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;
    }
  }
}
</style>
