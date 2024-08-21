<template>
  <div class="container">
    <h1>Ajouter une nouvelle offre d'emploi</h1>

    <div v-if="step === 1">
      <h2>Étape 1/3 : Décrire l'offre d'emploi</h2>
      <div class="form-group">
        <label for="job-title"
          >Quel est la meilleure dénomination pour cet emploi ?</label
        >
        <input type="text" id="job-title" v-model="formData.titre" />
      </div>
      <div class="form-group">
        <label for="job-description">Description</label>
        <textarea
          id="job-description"
          v-model="formData.description"
        ></textarea>
      </div>
      <button @click="nextStep">Suivant</button>
    </div>

    <div v-else-if="step === 2">
      <h2>Étape 2/3 : Choix des compétences</h2>
      <div class="form-group">
        <label
          >Quelles sont les compétences de base requises pour ce poste ?</label
        >
        <div v-for="skill in skills" :key="skill.id" class="skill-item">
          <input
            type="checkbox"
            :id="skill.id"
            v-model="formData.competencesRequises"
            :value="skill.name"
          />
          <label :for="skill.id">{{ skill.name }}</label>
        </div>
      </div>
      <button @click="prevStep">Précédent</button>
      <button @click="nextStep">Suivant</button>
    </div>

    <div v-else-if="step === 3">
      <h2>Étape 3/3 : Expérience et diplômes</h2>
      <div class="form-group">
        <label for="min-experience"
          >Quelle est l'expérience de travail minimale requise pour ce poste
          ?</label
        >
        <input
          type="number"
          id="min-experience"
          v-model.number="formData.experienceRequise"
        />
      </div>
      <div class="form-group">
        <label for="required-diploma"
          >Quels sont les diplômes requis pour ce poste ?</label
        >
        <input
          type="text"
          id="required-diploma"
          v-model="formData.diplomeRequis"
        />
      </div>
      <button @click="prevStep">Précédent</button>
      <button @click="submit">Soumettre</button>
    </div>

    <!-- Aperçu des données -->
    <div class="data-preview">
      <h3>Aperçu des données</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useEmploisJson } from '@/composables/useEmplois';

const { addEmploi } = useEmploisJson();

const step = ref(1);
const formData = reactive({
  titre: '',
  description: '',
  competencesRequises: [],
  experienceRequise: '',
  diplomeRequis: '',
});

const skills = [
  { id: 1, name: 'Office' },
  { id: 2, name: 'MySQL Workbench' },
  { id: 3, name: 'Heidi SQL' }
];

const nextStep = () => {
  if (step.value < 3) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const submit = async () => {
  try {
    const newEmploi = {
      ...formData,
      id: Date.now(),
      datePublication: new Date().toISOString().split('T')[0],
    };

    await addEmploi(newEmploi);
    // Redirection ou message de succès
  } catch (error) {
    console.error('Erreur ', error);
    // Gestion de l'erreur
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.skill-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.data-preview {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>
