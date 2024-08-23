<template>
  <div class="candidat-details">
    <h2>Informations détaillées du candidat</h2>
    <p><strong>Nom:</strong> {{ candidat.nom }} {{ candidat.prenom }}</p>
    <p><strong>Titre:</strong> {{ candidat.titre }}</p>
    <p><strong>Expérience:</strong> {{ candidat.experience }} ans</p>
    <p><strong>Email:</strong> {{ candidat.email }}</p>
    <p><strong>Téléphone:</strong> {{ candidat.telephone }}</p>
    <p><strong>Date d'inscription:</strong> {{ candidat.dateInscription }}</p>
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
  </div>
</template>

<script setup>
defineProps({
  candidat: Object,
});
</script>
