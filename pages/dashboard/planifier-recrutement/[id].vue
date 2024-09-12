<template>
  <div class="planifier-recrutement">
    <div v-if="emploi">
      <h2 id="bing">Candidatures pour le poste {{ emploi.titre }}</h2>
      <div v-if="alert" :class="['alert', alert.success ? 'alert-success' : 'alert-success']">
        {{ alert.message }}
      </div>
      <div class="tabs-container">
        <div class="tabs">
          <button @click="activeTab = 'tableau'" :class="{ active: activeTab === 'tableau' }"
            :data-shortlisted="isShortlisted">Tableau des candidats</button>
          <button @click="activeTab = 'shortlist'" :class="{ active: activeTab === 'shortlist' }">Shortlist</button>
        </div>
      </div>
      <div class="tab-content">

        <div v-if="activeTab === 'tableau'">

          <div class="tablewrapper">
            <div class="search-bar">
              <input v-model="searchQuery" placeholder="Rechercher un candidat...">
            </div>

            <table class="candidatures-table">
              <thead>
                <tr>
                  <th style="vertical-align: middle;" @click="sortBy('nom')">Nom et Prénoms</th>
                  <th style="vertical-align: middle;" @click="sortBy('titre')">Titre</th>
                  <th style="vertical-align: middle;" @click="sortBy('education')">Niveau d'éducation</th>
                  <th style="vertical-align: middle;" @click="sortBy('experience')">Expérience</th>
                  <th style="vertical-align: middle;" @click="sortBy('geolocalisation')">Géolocalisation</th>
                  <th @click="sortBy('adequation')">Taux d'adéquation</th>
                  <th style="vertical-align: middle;">Action</th>
                  <th>Shortlist ?</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="candidature in filteredAndSortedCandidatures" :key="candidature.id"
                  :class="{ 'retained': candidature.estretenu }">
                  <td style="vertical-align: middle;">{{ candidature.candidat.nom }} {{ candidature.candidat.prenom }}
                  </td>
                  <td style="vertical-align: middle;">{{ candidature.candidat.titre }}</td>
                  <td style="vertical-align: middle;">
                    <ul>
                      <li v-for="(edu, index) in candidature.candidat.education" :key="index">
                        {{ edu }}
                      </li>
                    </ul>
                  </td>
                  <td style="vertical-align: middle;">{{ candidature.candidat.experience }} ans</td>
                  <td style="vertical-align: middle;">{{ candidature.candidat.geolocalisation }}</td>
                  <td style="vertical-align: middle;">{{ candidature.adequation }} %</td>
                  <td style="vertical-align: middle;">
                    <button @click="showCandidatDetails(candidature)"> <span
                        class="material-icons">document</span></button>
                    <teleport to="body">
                      <div v-if="showPopup" class="popup">
                        <div class="popup-content">
                          <CandidatRecherche :candidat="selectedCandidat" :adequation="selectedCandidature.adequation"
                            :emploiId="emploiId" />
                          <div class="popupfooter is-flex is-align-items-center is-justify-content-space-between">
                            <button class="close-button" @click="showPopup = false">Fermer</button>
                            <button class="shortlist-button" @click="addToShortlist(selectedCandidat)">
                              Ajouter à la shortlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </teleport>

                  </td>
                  <td style="vertical-align: middle;">
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
        <div v-if="activeTab === 'shortlist'">
          <!-- <h3>Candidats retenus</h3> -->
          <Candidat v-for="candidature in candidaturesRetenues" :key="candidature.candidat_id"
            :candidat="candidature.candidat" :adequation="candidature.adequation" :emploiId="emploi.id" />
        </div>
      </div>

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
import CandidatRecherche from "@/components/CandidatRecherche.vue";
import Candidat from "@/components/Candidat.vue";
import { useEmploisJson } from "@/composables/useEmplois";
import { useCandidatsJson } from "@/composables/useCandidats";

const route = useRoute();
const emploiId = parseInt(route.params.id);
const { data: emplois } = useEmploisJson();
const { data: candidats } = useCandidatsJson();
const showPopup = ref(false);
const selectedCandidat = ref(null); const selectedCandidature = ref(null);
const addToShortlist = (candidat) => {
  addToCart({ candidat_id: candidat.candidat_id });
  showPopup.value = false;
};

const showCandidatDetails = (candidature) => {
  selectedCandidat.value = candidature.candidat;
  selectedCandidature.value = candidature;
  showPopup.value = true;
};

const emploi = computed(() => emplois.value.find((e) => e.id === emploiId));
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

const sortKey = ref('adequation');
const sortOrder = ref('desc');
const filters = ref({
  nom: '',
  titre: '',
  education: '',
  experience: '',
  geolocalisation: '',
  situationProfessionnelle: ''
});
const searchQuery = ref('');


const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'desc'; // Par défaut, on trie de manière décroissante
  }
};

const filteredAndSortedCandidatures = computed(() => {
  let result = candidatures.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(candidature =>
      candidature.candidat.nom.toLowerCase().includes(query) ||
      candidature.candidat.prenom.toLowerCase().includes(query) ||
      candidature.candidat.titre.toLowerCase().includes(query) ||
      candidature.candidat.geolocalisation.toLowerCase().includes(query) ||
      String(candidature.adequation).includes(query)
    );
  }

  // Tri
  result.sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];
    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
});


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
//alerte information de l'utilisat pour savoir le candidat est dans la shortliste

const alert = ref(null);
const activeTab = ref('tableau');

const addToCart = async (candidature) => {
  console.log('Début de la fonction addToCart');
  console.log('Candidature reçue:', candidature);
  try {
    console.log('Préparation de la requête fetch');
    const response = await fetch('/api/emploi/shortlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: emploiId,
        candidat_id: candidature.candidat_id,
        estretenu: true
      })
    });
    console.log('Réponse reçue:', response);
    const result = await response.json();
    console.log('Résultat parsé:', result);
    if (result.success) {
      console.log('Succès: Candidat ajouté à la shortlist');
      candidature.estretenu = true;
      alert.value = { type: 'success', message: 'Candidat ajouté à la shortlist' };
    } else {
      console.log('Échec: Le candidat n\'a pas été ajouté à la shortlist');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la shortlist:', error);
    alert.value = { type: 'error', message: 'Erreur lors de l\'ajout à la shortlist' };
  }
  console.log('État final de l\'alerte:', alert.value);
  // Effacer le message après 3 secondes
  setTimeout(() => {
    alert.value = null;
    console.log('Alerte effacée après 3 secondes');
  }, 10000);
};

//gestion des candidatures retirées du panier 
const removeToCart = async (candidature) => {
  console.log('Début de la fonction removeToCart');
  console.log('Candidature reçue:', candidature);
  try {
    console.log('Préparation de la requête fetch');
    const response = await fetch('/api/emploi/shortlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: emploiId,
        candidat_id: candidature.candidat_id,
        estretenu: false
      })
    });
    console.log('Réponse reçue:', response);
    const result = await response.json();
    console.log('Résultat parsé:', result);
    if (result.success) {
      console.log('Succès: Candidat retiré de la shortlist');
      candidature.estretenu = false;
      alert.value = { type: 'success', message: 'Candidat retiré de la shortlist' };
    } else {
      console.log('Échec: Le candidat n\'a pas été retiré de la shortlist');
    }
  } catch (error) {
    console.error('Erreur lors du retrait de la shortlist:', error);
    alert.value = { type: 'error', message: 'Erreur lors du retrait de la shortlist' };
  }
  console.log('État final de l\'alerte:', alert.value);
  setTimeout(() => {
    alert.value = null;
    console.log('Alerte effacée après 3 secondes');
  }, 10000);
};
//onglets dédiées à la gestion des candidatures

const candidaturesRetenues = computed(() => {
  if (!emploi.value) return [];
  return emploi.value.candidatures
    .filter(c => c.estretenu)
    .map(c => ({
      ...c,
      candidat: candidats.value.find(candidat => candidat.candidat_id === c.candidat_id)
    }));
});

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

.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.tabs button.active {
  background-color: #dc9756;
  color: black;
}

.candidatures-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
  padding: 1em;
  background: white;
}

.candidatures-table th,
.candidatures-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.candidatures-table th {
  font-weight: bold;
}

.candidatures-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.candidatures-table tr:hover {
  background-color: #f5f5f5;
}

.align-middle {
  vertical-align: middle !important;
}

.tablewrapper {
  padding: 1em;
  background: white;
}

.tabs button.active {
  background-color: #dc9756;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tabs-container {
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #3498db;
}

.tabs button {
  padding: 12px 24px;
  border: none;
  background-color: #ecf0f1;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  color: #34495e;
  border-radius: 5px 5px 0 0;
  margin-right: 2px;
}

.tabs button.active {
  background-color: #3498db;
  color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.tabs button:hover {
  background-color: #2980b9;
  color: white;
}

.tab-content {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 5px 5px;
}

.taki,
.search-bar {
  margin-bottom: 1em;

  input {
    max-width: 100%;
    padding: 10px 20px;
    border: none;
    background-color: #f8f9fa;
    cursor: pointer;
    transition: all 0.3s ease;
    max-width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #dc9756;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(220, 151, 86, 0.25);
    }


  }
}

.tabs button.active[data-shortlisted="true"] {
  background-color: #2ecc71;
}

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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}


.close-button {
  background-color: #012e61;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #023e7d;
}

.popup-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.shortlist-button {
  background-color: #2ecc71;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.shortlist-button:hover {
  background-color: #27ae60;
}

.rivez {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.retained {
  opacity: 0.5;
  background-color: #f0f0f0;
  // pointer-events: none;
}

.retained * {
  //pointer-events: none;
}
</style>
