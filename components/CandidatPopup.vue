<template>
  <teleport to="body">
    <div v-if="isOpen" class="popup" @click="close">
      <div class="popup-content" @click.stop>
        <div class="columns infordetaillecandidat">
          <div
            class="macine column is-5-mobile is-12-mobile is-flex is-flex-direction-row"
          >
            <div class="trunks is-flex is-flex-direction-row">
              <img :src="candidat.image" alt="" />
              <div class="neay is-flex is-flex-direction-column">
                <h2>{{ candidat.nom }} {{ candidat.prenom }}</h2>
                <p v-if="adequation > 80" class="candidat-parfait">
                  Candidat parfait
                </p>
                <p class="localisation">
                  <span class="material-icons">location_on</span>
                  {{ candidat.localisation }}
                </p>
              </div>
            </div>
            <div class="vegeta is-flex is-flex-direction-row">
              <p :class="['match', matchColorClass]">
                {{ adequation }}% d'adéquation par rapport au poste
              </p>
            </div>
          </div>
          <div class="column is-7-mobile is-12-mobile"></div>
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
defineProps({
  isOpen: Boolean,
  candidat: Object,
  adequation: Number,
});

const emit = defineEmits(["close"]);

const close = () => emit("close");
</script>
