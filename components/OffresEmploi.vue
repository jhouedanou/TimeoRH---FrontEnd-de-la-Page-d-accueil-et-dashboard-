<template>
  <div v-if="showAlert" class="notification is-success">
    {{ alertMessage }}
  </div>

  <div class="offres-emploi">
    <div class="filters">
      <div class="spaghetti">
        <input v-model="filtreTitle" placeholder="Filtrer par titre" />
        <input v-model="filtreDate" type="date" placeholder="Filtrer par date d'expiration" />
      </div>
      <div class="actions">
        <NuxtLink class="button is-primary" to="/dashboard/ajouter-offre">Publier une offre</NuxtLink>
      </div>
    </div>
    <div class="table-container">
      <table class="table is-fullwidth is-striped is-hoverable is-responsive">
        <thead>
          <tr>
            <th @click="changeSort('titre')">
              Intitulé du poste
              <span v-if="sortKey === 'titre'">{{
                sortOrder === "asc" ? "▲" : "▼"
              }}</span>
            </th>
            <th @click="changeSort('nombrePosteAPourvoir')">
              Nombre de postes à pourvoir
              <span v-if="sortKey === 'nombrePosteAPourvoir'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="changeSort('datePublication')">
              Date de publication <span v-if="sortKey === 'datePublication'">{{ sortOrder === 'asc' ? '▲' : '▼'
                }}</span>

            </th>
            <th @click="changeSort('dateExpiration')">
              Date d'expiration
              <span v-if="sortKey === 'dateExpiration'">{{
                sortOrder === "asc" ? "▲" : "▼"
              }}</span>
            </th>
            <th @click="changeSort('nombreCandidatures')">Candidatures reçues <span
                v-if="sortKey === 'nombreCandidatures'">{{ sortOrder === 'asc' ? '▲' : '▼'
                }}</span>
            </th>
            <th @click="changeSort('candidaturesRetenues')">Candidats retenus<span
                v-if="sortKey === 'candidaturesRetenues'">{{ sortOrder === 'asc' ? '▲' : '▼'
                }}</span></th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="offre in offresPageCourante" :key="offre.id">
            <td style="vertical-align: middle;">{{ offre.titre }}</td>
            <td>
              {{
                offre.nombrePosteAPourvoir }}
            </td>

            <td style="vertical-align: middle;">{{ offre.datePublication }}</td>
            <td style="vertical-align: middle;">{{ offre.dateExpiration }}</td>
            <td style="vertical-align: middle;">
              <NuxtLink class="planifierrecrutement tooltip" :to="`/dashboard/planifier-recrutement/${offre.id}`">{{
                candidaturesParOffre[offre.id] }} candidats<span class="tooltiptext">Cliquez ici pour lancer le
                  processus de recrutement</span>
              </NuxtLink>
            </td>

            <td style="vertical-align: middle;">{{ candidaturesRetenuesParOffre[offre.id] }}</td>
            <td style="vertical-align: middle;">
              <button class="editemploi" @click="editerOffre(offre)">

                <span class="material-icons">edit</span>

              </button>
              <EditOffrePopup v-if="editingOffreId === offre.id" :offre="offre" @close="editingOffreId = null"
                @save="saveEditedOffre" />
              <button class="supprimeroffre" @click="supprimerOffre(offre)">
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="showStatusPopup" class="modal is-active">
        <div class="modal-background" @click="showStatusPopup = false"></div>
        <div class="modal-content">
          <div class="box">
            <h2 class="title is-4">Changer le statut</h2>
            <div class="field">
              <label class="checkbox">
                <input type="radio" v-model="selectedOffre.statut" value="Actif" />
                Actif
              </label>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="radio" v-model="selectedOffre.statut" value="Inactif" />
                Inactif
              </label>
            </div>
            <button class="button is-primary" @click="saveStatus">
              Enregistrer
            </button>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="showStatusPopup = false"></button>
      </div>
      <div class="table-info">
        Affichage des données {{ debutAffichage }} à {{ finAffichage }} sur
        {{ totalEntrees }} entrées
      </div>
    </div>

    <div class="pagination">
      <button v-for="page in nombrePages" :key="page" @click="changerPage(page)"
        :class="{ 'is-active': page === pageCourante }">
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useEmploisJson } from "@/composables/useEmplois";
import { useCookie } from "#app";
import EditOffrePopup from "./EditOffrePopup.vue";
const showAlert = ref(false);
const alertMessage = ref("");

//CRUDS
const showStatusPopup = ref(false);
const selectedOffre = ref(null);
const showEditPopup = ref(false);
const offreToEdit = ref(null);
const editingOffreId = ref(null);
const debutAffichage = computed(
  () => (pageCourante.value - 1) * offresParPage + 1
);
const finAffichage = computed(() =>
  Math.min(pageCourante.value * offresParPage, offresFiltered.value.length)
);
const totalEntrees = computed(() => offresFiltered.value.length);

const sortKey = ref("titre");
const sortOrder = ref("asc");

const { data: emplois, updateEmploiStatusDansLaListe } = useEmploisJson();
const recruteurId = useCookie("recruteur_id").value;
const filtreTitle = ref("");
const filtreDate = ref("");
const pageCourante = ref(1);
const offresParPage = 8;

const offresFiltered = computed(() => {
  if (!emplois.value) return [];

  let filtered = emplois.value.filter(
    (offre) =>
      offre.recruteurId === recruteurId &&
      offre.titre.toLowerCase().includes(filtreTitle.value.toLowerCase()) &&
      (filtreDate.value === "" || offre.dateExpiration >= filtreDate.value)
  );

  return filtered.sort((a, b) => {
    let modifier = sortOrder.value === "desc" ? -1 : 1;

    if (sortKey.value === 'nombreCandidatures') {
      return (candidaturesParOffre[a.id] - candidaturesParOffre[b.id]) * modifier;
    } else if (sortKey.value === 'candidaturesRetenues') {
      return (candidaturesRetenuesParOffre[a.id] - candidaturesRetenuesParOffre[b.id]) * modifier;
    } else {
      if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
      if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
      return 0;
    }
  });
});
const candidaturesParOffre = computed(() => {
  return emplois.value.reduce((acc, offre) => {
    acc[offre.id] = offre.candidatures ? offre.candidatures.length : 0;
    return acc;
  }, {});
});
//nombre de candidatures retenue
const candidaturesRetenuesParOffre = computed(() => {
  return emplois.value.reduce((acc, offre) => {
    acc[offre.id] = offre.candidatures ? offre.candidatures.filter(c => c.estretenu === true).length : 0;
    return acc;
  }, {});
});
const changeSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};

const nombrePages = computed(() =>
  Math.ceil(offresFiltered.value.length / offresParPage)
);

const offresPageCourante = computed(() => {
  const debut = (pageCourante.value - 1) * offresParPage;
  const fin = debut + offresParPage;
  return offresFiltered.value.slice(debut, fin);
});

const changerPage = (page) => {
  pageCourante.value = page;
};

const ajouterOffre = () => {
  // Logique pour ajouter une offre
};

const editerOffre = (offre) => {
  editingOffreId.value = offre.id;
  offreToEdit.value = { ...offre };
  showEditPopup.value = true;
};
const saveEditedOffre = async (editedOffre) => {
  try {
    const response = await fetch("/api/emploi/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedOffre),
    });

    if (response.ok) {
      const updatedOffre = await response.json();
      const index = emplois.value.findIndex((o) => o.id === updatedOffre.id);
      if (index !== -1) {
        emplois.value[index] = updatedOffre;
        alertMessage.value = "L'offre d'emploi a été mise à jour avec succès !";
        showAlert.value = true;
        setTimeout(() => {
          showAlert.value = false;
        }, 3000);
      }
      showEditPopup.value = false;
      editingOffreId.value = null;
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'offre:", error);
    alertMessage.value = "Erreur lors de la mise à jour de l'offre d'emploi.";
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }
};

const planifierRecrutement = (offre) => {
  // Logique pour planifier le recrutement
};

const changerStatut = (offre) => {
  // Logique pour changer le statut

  selectedOffre.value = offre;
  showStatusPopup.value = true;
};
const saveStatus = async () => {
  console.log("Début de saveStatus");
  console.log("Offre sélectionnée:", selectedOffre.value);
  try {
    const result = await updateEmploiStatusDansLaListe(selectedOffre.value);
    console.log("Résultat de updateEmploiStatusDansLaListe:", result);
    if (result.success) {
      const index = emplois.value.findIndex(
        (o) => o.id === selectedOffre.value.id
      );
      console.log("Index trouvé:", index);
      if (index !== -1) {
        emplois.value[index] = result.emploi;
        alert("Statut mis à jour avec succès");
      }
    }
  } catch (error) {
    console.error("Erreur dans saveStatus:", error);
    alert("Une erreur est survenue lors de la mise à jour du statut");
  }

  console.log("Fermeture de la popup");
  showStatusPopup.value = false;
  selectedOffre.value = null;
};

const supprimerOffre = async (offre) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
    try {
      const response = await fetch(`/api/emploi/${offre.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        emplois.value = emplois.value.filter((e) => e.id !== offre.id);
        alertMessage.value = "L'offre a été supprimée avec succès";
        showAlert.value = true;
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre:", error);
    }
  }
};
</script>

<style lang="scss">
th {
  cursor: pointer;
}

th:hover {
  background-color: #f5f5f5;
}

.offres-emploi {
  margin: 20px;
}

.filters {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}

.pagination button.is-active {
  background-color: var(--primary-color);
  color: white;
}

.offres-emploi-container {
  overflow-x: auto;
}

.table-container {
  overflow-x: auto;
}

.table-info {
  margin-top: 1rem;
  text-align: right;
  font-size: 0.9em;
  color: #666;
}

.table-container {
  padding: 1em;
  border-radius: 6px;
  border: solid 2px #eceef6;
  background-color: #fff;

  table {}
}

@media screen and (max-width: 768px) {
  .table {
    font-size: 0.9em;
  }

  .table td,
  .table th {
    padding: 0.5em 0.75em;
  }
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}

.pagination button.is-active {
  background-color: var(--primary-color);
  color: white;
}

.offres-emploi-container {
  overflow-x: auto;
}

.table-container {
  overflow-x: auto;
}

.table-info {
  margin-top: 1rem;
  text-align: right;
  font-size: 0.9em;
  color: #666;
}

.table-container {
  padding: 1em;
  border-radius: 6px;
  border: solid 2px #eceef6;
  background-color: #fff;
}

.table {
  background-color: white;
}

th {
  padding: 1em !important;
}

td {
  border: none !important;
  padding: 1em !important;
  vertical-align: middle;
}

td,
th {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.14px;
  text-align: left;
  color: #292d32 !important;
  vertical-align: middle;
}

.table.is-striped tbody tr:not(.is-selected):nth-child(even) {
  background-color: #f5f5f5;
}

@media screen and (max-width: 768px) {
  .offres-emploi {
    margin: 0em !important;
  }

  .table {
    font-size: 0.9em;
  }

  .table td,
  .table th {
    vertical-align: middle;
    padding: 0.5em 0.75em;

    button,
    a {
      margin-bottom: 1em !important;
      width: 100% !important;
    }
  }
}

.table.is-hoverable tbody tr:not(.is-selected):hover,
.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover {
  background-color: #ccc !important;
}

.filters {
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-radius: 5px;
  background-color: #fff;

  .button {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 11px 19px;
    border-radius: 32px;
    background-color: #012e61;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.11px;
    text-align: center;
    color: #fff;
  }
}

.spaghetti {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  input {
    width: 100%;
    height: 50px;
    min-width: 150px;
    border-radius: 10px;
    border: solid 1px #e7e6e6;
    background-color: #fafafa;
    margin-right: 10px;
    padding: 1em;
  }
}

.title {
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

@media screen and (max-width: 768px) {
  .table-container {
    overflow-x: auto !important;
  }
}

.table {
  table-layout: fixed;
  width: 100%;

  .col-titre {
    width: 25%;
  }

  .col-date {
    width: 15%;
  }

  .col-candidatures {
    width: 10%;
  }
}

.tooltip {
  position: relative;
  display: inline-block;

  &:hover {
    .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }
}

.tooltiptext {
  visibility: hidden;
  width: 320px;
  color: white;
  background-color: rgb(1, 46, 97);
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 1em;
  right: 1em;
  opacity: 0;
  padding: 1em;
  transition: opacity 0.3s;
  position: fixed;
  z-index: 100;
}

a.planifierrecrutement.tooltip {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
