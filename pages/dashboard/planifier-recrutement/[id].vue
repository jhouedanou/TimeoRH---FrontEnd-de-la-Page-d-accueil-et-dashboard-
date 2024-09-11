<template>
  <div class="planifier-recrutement">
    <div v-if="emploi">
      <h2 id="bing">Candidatures pour le poste {{ emploi.titre }}</h2>
      <div v-if="alert" :class="['alert', alert.success ? 'alert-success' : 'alert-danger']">
        {{ alert.message }}
      </div>
      <table class="candidatures-table">
        <thead>
          <tr>
            <th class="align-middle" @click="sortBy('nom')">Nom et Prénoms</th>
            <th class="align-middle" @click="sortBy('titre')">Titre</th>
            <th class="align-middle" @click="sortBy('education')">Niveau d'éducation</th>
            <th class="align-middle" @click="sortBy('experience')">Expérience</th>
            <th class="align-middle" @click="sortBy('geolocalisation')">Géolocalisation</th>
            <th class="align-middle" @click="sortBy('situationProfessionnelle')">Situation Professionnelle</th>
            <th class="align-middle">Action</th>
            <th>Shortlist ?</th>
          </tr>
          <tr>
            <th class="align-middle"><input v-model="filters.nom" placeholder="Filtrer par nom"></th>
            <th class="align-middle"><input v-model="filters.titre" placeholder="Filtrer par titre"></th>
            <th class="align-middle"><input v-model="filters.education" placeholder="Filtrer par éducation"></th>
            <th class="align-middle"><input v-model="filters.experience" placeholder="Filtrer par expérience"></th>
            <th class="align-middle"><input v-model="filters.geolocalisation" placeholder="Filtrer par géolocalisation">
            </th>
            <th class="align-middle"><input v-model="filters.situationProfessionnelle"
                placeholder="Filtrer par situation"></th>
            <th class="align-middle"></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidature in filteredAndSortedCandidatures" :key="candidature.id">
            <td class="align-middle">{{ candidature.candidat.nom }} {{ candidature.candidat.prenom }}</td>
            <td class="align-middle">{{ candidature.candidat.titre }}</td>
            <td class="align-middle">
              <ul>
                <li v-for="(edu, index) in candidature.candidat.education" :key="index">
                  {{ edu }}
                </li>
              </ul>
            </td>
            <td class="align-middle">{{ candidature.candidat.experience }} ans</td>
            <td class="align-middle">{{ candidature.candidat.geolocalisation }}</td>
            <td class="align-middle">{{ candidature.candidat.situationProfessionnelle }}</td>
            <td class="align-middle">
              <button @click="showCandidatDetails(candidature)">Voir détails</button>
            </td>
            <td>
              <button class="savei" @click="addToCart(candidature)">
                <span class="material-icons">add</span>
              </button>
              <button class="removei" @click="removeToCart(candidature)">
                <span class="material-icons">remove</span>
              </button>
            </td>


          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Candidat from "@/components/Candidat.vue";
import { useEmploisJson } from "@/composables/useEmplois";
import { useCandidatsJson } from "@/composables/useCandidats";

const route = useRoute();
const emploiId = parseInt(route.params.id);
const { data: emplois } = useEmploisJson();
const { data: candidats } = useCandidatsJson();

const emploi = computed(() => emplois.value.find((e) => e.id === emploiId));
const alert = ref(null);
const getAdequationClass = (adequation) => {
  if (adequation >= 80) return 'adequation-high';
  if (adequation >= 60) return 'adequation-medium';
  return 'adequation-low';
};
const handleInterviewAdded = (result) => {
  alert.value = result;
  setTimeout(() => {
    alert.value = null;
  }, 3000);
};
const candidatures = computed(() => {
  if (!emploi.value) return [];
  return emploi.value.candidatures.map((c) => ({
    ...c,
    candidat: candidats.value.find(
      (candidat) => candidat.candidat_id === c.candidat_id
    ),
  }));
});

const sortKey = ref('');
const sortOrder = ref('asc');
const filters = ref({
  nom: '',
  titre: '',
  education: '',
  experience: '',
  geolocalisation: '',
  situationProfessionnelle: ''
});

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const filteredAndSortedCandidatures = computed(() => {
  let result = candidatures.value;

  // Filtrage
  Object.keys(filters.value).forEach(key => {
    if (filters.value[key]) {
      result = result.filter(candidature =>
        String(candidature.candidat[key]).toLowerCase().includes(filters.value[key].toLowerCase())
      );
    }
  });

  // Tri
  if (sortKey.value) {
    result.sort((a, b) => {
      let aValue = a.candidat[sortKey.value];
      let bValue = b.candidat[sortKey.value];
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return result;
});

const showCandidatDetails = (candidature) => {
  // Implémentez ici la logique pour afficher les détails du candidat
};

const nombreAffiche = ref(12);
const candidaturesAffichees = computed(() => {
  return filteredAndSortedCandidatures.value.slice(0, nombreAffiche.value);
});

const afficherPlus = computed(() => {
  return nombreAffiche.value < filteredAndSortedCandidatures.value.length;
});

const chargerPlus = () => {
  nombreAffiche.value += 3;
};

//ggestion des candidatures, ajout au panier 
const addToCart = async (candidature) => {
  try {
    const response = await fetch('/api/emploi/shortlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: emploiId,
        candidat_id: candidature.candidat_id,
        estretenu: true
      })
    });
    const result = await response.json();
    if (result.success) {
      candidature.estretenu = true;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la shortlist:', error);
  }
};

//gestion des candidatures retirer du panier 
const removeToCart = async (candidature) => {
  try {
    const response = await fetch('/api/emploi/shortlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: emploiId,
        candidat_id: candidature.candidat_id,
        estretenu: false
      })
    });
    const result = await response.json();
    if (result.success) {
      candidature.estretenu = true;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la shortlist:', error);
  }
};


</script>
<style lang="scss">
.alert {
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.ericDraven {
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 26px;
  margin: 0 auto 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#bing {
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  padding: 1em;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.8;
  letter-spacing: 0.4px;
  text-align: left;
  color: #dc9756;
}

.candidatures-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
}

.candidatures-table th,
.candidatures-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.candidatures-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.candidatures-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

align-middle {
  vertical-align: middle !important;
}
</style>
