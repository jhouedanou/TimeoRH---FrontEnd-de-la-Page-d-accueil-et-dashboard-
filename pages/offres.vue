<template id="appeloki">
  <home-page-header />
  <Banner />
  <div class="offremploi-container container">
    <div class="offres-emploi">
      <form @submit.prevent="appliquerFiltres" class="filtres">
        <div class="columns">
          <div class="column is-one-third-desktop is-12-mobile">
            <input
              v-model="filtres.titre"
              list="titres"
              placeholder="Titre du poste"
            />
            <datalist id="titres">
              <option v-for="titre in titres" :key="titre" :value="titre" />
            </datalist>
          </div>

          <div class="column is-one-third-desktop is-12-mobile">
            <input
              v-model="filtres.geolocalisation"
              list="localisations"
              placeholder="Localisation"
            />
            <datalist id="localisations">
              <option v-for="loc in localisations" :key="loc" :value="loc" />
            </datalist>
          </div>
          <div class="column is-one-third-desktop is-12-mobile">
            <select v-model="filtres.type">
              <option value="">Type de contrat</option>
              <option v-for="type in types" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
          <div class="column is-one-third-desktop is-12-mobile">
            <select v-model="filtres.experiencerequise">
              <option value="">Expérience requise</option>
              <option v-for="exp in experiences" :key="exp" :value="exp">
                {{ exp }}
              </option>
            </select>
          </div>
          <div class="column">
            <button type="submit">Filtrer</button>

            <button
              @click="reinitialiserFiltres"
              class="btn btn-secondary mt-3"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        </div>
      </form>

      <div class="columns">
        <div class="filtrewrapper column is-4-desktop">
          <div class="accordion">
            <div class="accordion-item">
              <button class="accordion-header" @click="toggleAccordion($event)">
                Type de contrat
              </button>
              <div class="accordion-content">
                <div v-for="type in types" :key="type" class="form-check">
                  <input
                    type="checkbox"
                    :id="type"
                    v-model="filtres.typeCheckbox"
                    :value="type"
                  />
                  <label :for="type">{{ type }}</label>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header" @click="toggleAccordion($event)">
                Niveau d'expérience
              </button>
              <div class="accordion-content">
                <div v-for="exp in experiences" :key="exp" class="form-check">
                  <input
                    type="checkbox"
                    :id="exp"
                    v-model="filtres.experiencerequisecheckbox"
                    :value="exp"
                  />
                  <label :for="exp">{{ exp }}</label>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header" @click="toggleAccordion($event)">
                Mots-clés
              </button>
              <div class="accordion-content">
                <div class="keywords-input">
                  <div
                    v-for="(keyword, index) in filtres.motsCles"
                    :key="index"
                    class="keyword-chip"
                  >
                    {{ keyword }}
                    <button
                      @click="removeKeyword(index)"
                      class="remove-keyword"
                    >
                      ×
                    </button>
                  </div>
                  <input
                    type="text"
                    v-model="newKeyword"
                    @keyup.enter="addKeyword"
                    @input="handleInput"
                    placeholder="Entrez des mots-clés"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <button @click="reinitialiserFiltres" class="btn btn-secondary mt-3">
            Réinitialiser tous les filtres
          </button>
        </div>

        <div class="column is-8-desktop">
          <div v-if="noResults" class="alert alert-warning">
            Aucun poste ne correspond aux critères de recherche. Veuillez
            modifier vos filtres.
            <button
              @click="reinitialiserFiltres"
              class="btn btn-secondary mt-3"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
          <div v-if="!noResults" class="emplois-liste">
            <div class="columns ndjo is-flex is-flex-wrap-wrap">
              <EmploiCard
                v-for="emploi in emploisFiltres.emplois"
                :key="emploi.id"
                :imageHomepage="emploi.imageHomepage"
                :titre="emploi.titre"
                :societe="emploi.societe"
                :shortDescription="emploi.shortDescription"
                :type="emploi.type"
                :geolocalisation="emploi.geolocalisation"
                :experienceRequise="emploi.experienceRequise"
                :typeDeContrat="emploi.typeDeContrat"
                class="column is-6-desktop is-12-tablet is-12-mobile"
              />
            </div>
          </div>

          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
              Précédent
            </button>
            <span>Page {{ currentPage }} sur {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCarouselHomepageEmplois } from "@/composables/useCarouselHomepageEmplois";
import { useRoute } from "vue-router";
import EmploiCard from "@/components/emploiCard.vue";
import { useHead } from "#app";
useHead({
  title: "TimeoRH - Offres d'emploi",
});
const { data: emplois } = useCarouselHomepageEmplois();
const route = useRoute();

const filtres = ref({
  titre: "",
  geolocalisation: "",
  type: "",
  experiencerequise: "",
  typeCheckbox: [],
  experiencerequisecheckbox: [],
  motsCles: [],
});

const currentPage = ref(1);
const emploisPerPage = 4;
const newKeyword = ref("");

const titres = computed(() => [...new Set(emplois.value.map((e) => e.titre))]);
const localisations = computed(() => [
  ...new Set(emplois.value.map((e) => e.geolocalisation)),
]);
const types = computed(() => [
  ...new Set(emplois.value.map((e) => e.typeDeContrat)),
]);
const experiences = computed(() => [
  ...new Set(emplois.value.map((e) => e.experienceRequise)),
]);

const emploisFiltres = computed(() => {
  const filtered = emplois.value.filter((emploi) => {
    const matchTitre =
      !filtres.value.titre ||
      emploi.titre.toLowerCase().includes(filtres.value.titre.toLowerCase());
    const matchGeo =
      !filtres.value.geolocalisation ||
      emploi.geolocalisation
        .toLowerCase()
        .includes(filtres.value.geolocalisation.toLowerCase());
    const matchType =
      !filtres.value.type || emploi.typeDeContrat === filtres.value.type;
    const matchExp =
      !filtres.value.experiencerequise ||
      emploi.experienceRequise === filtres.value.experiencerequise;
    const matchTypeCheckbox =
      filtres.value.typeCheckbox.length === 0 ||
      filtres.value.typeCheckbox.includes(emploi.typeDeContrat);
    const matchExpCheckbox =
      filtres.value.experiencerequisecheckbox.length === 0 ||
      filtres.value.experiencerequisecheckbox.includes(
        emploi.experienceRequise
      );
    const matchMotsCles =
      filtres.value.motsCles.length === 0 ||
      filtres.value.motsCles.some((mot) =>
        emploi.motsCles.some((mc) =>
          mc.mot.toLowerCase().includes(mot.toLowerCase())
        )
      );

    return (
      matchTitre &&
      matchGeo &&
      matchType &&
      matchExp &&
      matchTypeCheckbox &&
      matchExpCheckbox &&
      matchMotsCles
    );
  });

  const start = (currentPage.value - 1) * emploisPerPage;
  const end = start + emploisPerPage;

  return {
    total: filtered.length,
    emplois: filtered.slice(start, end),
  };
});

const totalPages = computed(() =>
  Math.ceil(emploisFiltres.value.total / emploisPerPage)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const appliquerFiltres = () => {
  currentPage.value = 1;
  console.log("Filtres appliqués:", filtres.value);
};

const reinitialiserFiltres = () => {
  filtres.value = {
    titre: "",
    geolocalisation: "",
    type: "",
    experiencerequise: "",
    typeCheckbox: [],
    experiencerequisecheckbox: [],
    motsCles: [],
  };
  appliquerFiltres();
};

const toggleAccordion = (event) => {
  const content = event.target.nextElementSibling;
  content.style.maxHeight = content.style.maxHeight
    ? null
    : content.scrollHeight + "px";
};

const addKeyword = () => {
  if (newKeyword.value.trim()) {
    filtres.value.motsCles.push(newKeyword.value.trim());
    newKeyword.value = "";
  }
};

const removeKeyword = (index) => {
  filtres.value.motsCles.splice(index, 1);
};
const noResults = computed(() => emploisFiltres.value.total === 0);

onMounted(() => {
  document.body.id = "offres";

  const searchQuery = route.query.titre;
  if (searchQuery) {
    filtres.value.titre = searchQuery;
    appliquerFiltres();
  }
});
</script>

<style>
#HeaderFront {
  margin-top: 62px !important;
}
.offres-emploi {
  padding: 20px;
}

.filtres {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.emplois-liste {
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.accordion-header {
  background-color: #f1f1f1;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
}

.accordion-header:hover {
  background-color: #ddd;
}

.accordion-content {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.keywords-input {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.keyword-chip {
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
}

.remove-keyword {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}
</style>
