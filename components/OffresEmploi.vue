<template>
  <div class="offres-emploi">
    <div class="filters">
      <div class="spaghetti">
        <input v-model="filtreTitle" placeholder="Filtrer par titre" />
        <input
          v-model="filtreDate"
          type="date"
          placeholder="Filtrer par date d'expiration"
        />
      </div>
      <div class="actions">
        <NuxtLink class="button is-primary" to="/dashboard/ajouter-offre"
          >Ajouuter une offre</NuxtLink
        >
      </div>
    </div>
    <div class="table-container">
      <table class="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th @click="changeSort('titre')">
              Intitulé du poste
              <span v-if="sortKey === 'titre'">{{
                sortOrder === "asc" ? "▲" : "▼"
              }}</span>
            </th>
            <th @click="changeSort('dateExpiration')">
              Date d'expiration
              <span v-if="sortKey === 'dateExpiration'">{{
                sortOrder === "asc" ? "▲" : "▼"
              }}</span>
            </th>
            <th @click="changeSort('statut')">
              Statut
              <span v-if="sortKey === 'statut'">{{
                sortOrder === "asc" ? "▲" : "▼"
              }}</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="offre in offresPageCourante" :key="offre.id">
            <td>{{ offre.titre }}</td>
            <td>{{ offre.dateExpiration }}</td>
            <td>{{ offre.statut }}</td>
            <td>
              <button class="editemploi" @click="editerOffre(offre)">
                Éditer
              </button>
              <button
                class="planifierrecrutement"
                @click="planifierRecrutement(offre)"
              >
                Planifier le recrutement
              </button>
              <button class="changerstatut" @click="changerStatut(offre)">
                Changer le statut
              </button>
              <button class="supprimeroffre" @click="supprimerOffre(offre)">
                Supprimer
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
                <input
                  type="radio"
                  v-model="selectedOffre.statut"
                  value="Actif"
                />
                Actif
              </label>
            </div>
            <div class="field">
              <label class="checkbox">
                <input
                  type="radio"
                  v-model="selectedOffre.statut"
                  value="Inactif"
                />
                Inactif
              </label>
            </div>
            <button class="button is-primary" @click="saveStatus">
              Enregistrer
            </button>
          </div>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          @click="showStatusPopup = false"
        ></button>
      </div>
      <div class="table-info">
        Affichage des données {{ debutAffichage }} à {{ finAffichage }} sur
        {{ totalEntrees }} entrées
      </div>
    </div>

    <div class="pagination">
      <button
        v-for="page in nombrePages"
        :key="page"
        @click="changerPage(page)"
        :class="{ 'is-active': page === pageCourante }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useEmploisJson } from "@/composables/useEmplois";
import { useCookie } from "#app";
//CRUDS
const showStatusPopup = ref(false);
const selectedOffre = ref(null);

const debutAffichage = computed(
  () => (pageCourante.value - 1) * offresParPage + 1
);
const finAffichage = computed(() =>
  Math.min(pageCourante.value * offresParPage, offresFiltered.value.length)
);
const totalEntrees = computed(() => offresFiltered.value.length);

const sortKey = ref("titre");
const sortOrder = ref("asc");

const { data: emplois, updateEmploi } = useEmploisJson();
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
    if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
    return 0;
  });
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
  // Logique pour éditer une offre
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
    const result = await updateEmploi(selectedOffre.value);
    console.log("Résultat de updateEmploi:", result);
    if (result.success) {
      const index = emplois.value.findIndex(
        (o) => o.id === selectedOffre.value.id
      );
      console.log("Index trouvé:", index);
      if (index !== -1) {
        emplois.value[index] = result.emploi;
        console.log("Emploi mis à jour dans le tableau local");
      }
    }
  } catch (error) {
    console.error("Erreur dans saveStatus:", error);
  }

  console.log("Fermeture de la popup");
  showStatusPopup.value = false;
  selectedOffre.value = null;
};

const supprimerOffre = (offre) => {
  // Logique pour supprimer une offre
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
  table {
  }
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
  .table {
    font-size: 0.9em;
  }

  .table td,
  .table th {
    padding: 0.5em 0.75em;
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
    margin: 4px 0 4px 604px;
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
</style>
