<template>
  <div class="popup-overlay">
    <div class="popup-content">
      <h2>Éditer l'offre</h2>
      <form @submit.prevent="saveOffre">
        <input v-model="editedOffre.titre" placeholder="Titre" />
        <input v-model="editedOffre.societe" placeholder="Société" />
        <textarea
          v-model="editedOffre.description"
          placeholder="Description"
        ></textarea>
        <input v-model="editedOffre.dateExpiration" type="date" />
        <input v-model="editedOffre.statut" placeholder="Statut" />
        <input
          v-model="editedOffre.experienceRequise"
          placeholder="Expérience requise"
        />
        <input
          v-model="editedOffre.typeDeContrat"
          placeholder="Type de contrat"
        />
        <input v-model="editedOffre.type" placeholder="Type" />
        <input
          v-model="editedOffre.geolocalisation"
          placeholder="Géolocalisation"
        />
        <input v-model="editedOffre.datePublication" type="date" />
        <button type="submit">Sauvegarder</button>
        <button @click="$emit('close')">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["offre"]);
const emit = defineEmits(["close", "save"]);

const editedOffre = ref({});

onMounted(() => {
  editedOffre.value = { ...props.offre };
});

const saveOffre = async () => {
  try {
    const response = await fetch("/api/emploi/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedOffre.value),
    });
    const result = await response.json();
    if (result.success) {
      emit("save", result.emploi);
    } else {
      console.error("Erreur lors de la sauvegarde:", result.message);
    }
  } catch (error) {
    console.error("Erreur lors de la requête:", error);
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(1, 46, 97, 0.88);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #1976d2;
}

button {
  padding: 10px 15px;
  border-radius: 10px;
  border: solid 1px #e7e6e6;
  background-color: #fafafa;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #012e61;
  color: #fafafa;
}
</style>
