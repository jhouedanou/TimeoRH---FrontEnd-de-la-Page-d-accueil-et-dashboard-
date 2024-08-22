<template>
  <div class="cv">
    <h2>{{ candidat.nom }} {{ candidat.prenom }}</h2>
    <img :src="candidat.image" :alt="candidat.nom" />
    <p>
      Taux de remplissage du profil : {{ candidat.taux_remplissage_profil }}%
    </p>
    <p>Géolocalisation : {{ candidat.geolocalisation }}</p>
    <p>Taux d'adéquation : {{ adequation }}%</p>
    <p v-if="adequation > 80" class="mention">Candidat parfait</p>

    <h3>Compétences</h3>
    <ul>
      <li v-for="competence in candidat.competences" :key="competence">
        {{ competence }}
      </li>
    </ul>

    <h3>Diplômes</h3>
    <ul>
      <li v-for="diplome in candidat.education" :key="diplome">
        {{ diplome }}
      </li>
    </ul>

    <h3>Expérience professionnelle</h3>
    <p>{{ candidat.experience }} ans d'expérience</p>

    <h3>Documents</h3>
    <p>CV : {{ candidat.cv }}</p>
    <p>Lettre de motivation : {{ candidat.lettre_motivation }}</p>
  </div>
</template>

<script setup>
defineProps({
  candidat: Object,
  adequation: Number,
});
</script>

<style scoped>
.cv {
  /* Ajoutez vos styles ici */
}
.mention {
  color: green;
  font-weight: bold;
}
</style>
