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

        <button @click="showPopup = true" class="andrewtateisanidiot">
          Afficher le CV
        </button>
      </div>
    </div>
  </div>

  <teleport to="body">
    <div v-if="showPopup" class="popup" @click="showPopup = false">
      <div class="popup-content">
        <div class="columns infordetaillecandidat">
          <div
            class="macine column is-5-desktop is-12-mobile is-flex is-flex-direction-row"
          >
            <div class="columns">
              <div
                class="trunks is-flex is-flex-direction-row column is-9-desktop is-12-mobile"
              >
                <img :src="candidat.image" alt="" />
                <div class="neay is-flex is-flex-direction-column">
                  <h2>{{ candidat.nom }} {{ candidat.prenom }}</h2>
                  <p v-if="adequation > 80" class="candidat-parfait">
                    Candidat parfait
                  </p>
                  <p class="localisation">
                    <span class="material-icons">location_on</span>
                    {{ candidat.geolocalisation }}
                  </p>
                </div>
              </div>
              <div
                class="vegeta is-flex is-flex-direction-row column is-3-desktop is-12-mobile"
              >
                <div :class="['match', matchColorClass]">
                  <span class="brad"> {{ adequation }}</span>
                  <p>adéquation par rapport au poste</p>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-7-desktop is-12-mobile"></div>
        </div>
        <h2>Informations détaillées du candidat</h2>
        <p><strong>Nom:</strong></p>
        <p><strong>Titre:</strong> {{ candidat.titre }}</p>
        <p><strong>Expérience:</strong> {{ candidat.experience }} ans</p>
        <p><strong>Email:</strong> {{ candidat.email }}</p>
        <p><strong>Téléphone:</strong> {{ candidat.telephone }}</p>
        <p>
          <strong>Date d'inscription:</strong> {{ candidat.dateInscription }}
        </p>
        <p><strong>Géolocalisation:</strong> {{ candidat.geolocalisation }}</p>
        <h3>Points forts</h3>
        <ul>
          <li v-for="(point, index) in candidat.points_forts" :key="index">
            {{ point }}
          </li>
        </ul>
        <h3>Compétences</h3>
        <ul>
          <li v-for="(competence, index) in candidat.competences" :key="index">
            {{ competence }}
          </li>
        </ul>
        <h3>Appréciation</h3>
        <p>{{ candidat.appreciation }}</p>
        <button @click="showPopup = false">Fermer</button>
      </div>
    </div>
  </teleport>
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
const closePopup = () => {
  showPopup.value = false;
};
const matchColorClass = computed(() => {
  if (props.adequation >= 80) return "match-green";
  if (props.adequation >= 60) return "match-orange";
  return "match-red";
});
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 5px;
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  height: 100%;
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
  background: none;
  border: none;
  cursor: pointer;
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
.trunks {
  img {
    width: 114px;
    height: 114px;
    border-radius: 100%;
  }
}
.macine {
  border-radius: 6px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 2px #d7d7d7;
  background-color: #fff;
  padding: 1em;
  h2 {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: left;
    color: #012e61;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 14px;
    letter-spacing: normal;
    text-align: left;
    color: #9297a6;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
  }
}
.neay {
  padding-left: 10px;
}
.candidat-parfait {
  width: 151px;
  height: 30px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 1.5em;
  background: rgba(249, 231, 190, 0.42) url(/images/star-svgrepo-com.svg) center
    left no-repeat;
}
.brad {
  font-family: "Open Sans", sans-serif;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.92;
  letter-spacing: -0.48px;
  text-align: left;
  color: #012e61;
}
.vegeta {
  p {
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: normal;
    text-align: left;
    color: #18191c;
    position: relative;
    margin-top: 1em;
  }
  .match {
    position: relative;
  }
  .match-green {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &::after {
        background: url("/images/201.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
  .match-orange {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &::after {
        background: url("/images/200.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
  .match-red {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &::after {
        background: url("/images/202.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>
