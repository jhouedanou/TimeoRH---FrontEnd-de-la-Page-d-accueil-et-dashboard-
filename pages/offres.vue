<template>
  <div class="offres-emploi">
    <h1>Offres d'emploi</h1>

    <form @submit.prevent="appliquerFiltres" class="filtres">
      <input
        v-model="filtres.titre"
        list="titres"
        placeholder="Titre du poste"
      />
      <datalist id="titres">
        <option v-for="titre in titres" :key="titre" :value="titre" />
      </datalist>

      <input
        v-model="filtres.geolocalisation"
        list="localisations"
        placeholder="Localisation"
      />
      <datalist id="localisations">
        <option v-for="loc in localisations" :key="loc" :value="loc" />
      </datalist>

      <select v-model="filtres.type">
        <option value="">Type de contrat</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <select v-model="filtres.experiencerequise">
        <option value="">Expérience requise</option>
        <option v-for="exp in experiences" :key="exp" :value="exp">
          {{ exp }}
        </option>
      </select>

      <button type="submit">Filtrer</button>
      <button type="button" @click="reinitialiserFiltres">Réinitialiser</button>
    </form>

    <div class="columns">
      <div class="filtrewrapper column is-4-desktop">
        <UAccordion>
          <UAccordionItem>
            <template #title>Type de contrat</template>
            <template #content>
              <div v-for="type in types" :key="type" class="form-check">
                <UCheckbox v-model="filtres.typeCheckbox" :value="type">{{
                  type
                }}</UCheckbox>
              </div>
            </template>
          </UAccordionItem>
          <UAccordionItem>
            <template #title>Niveau d'expérience</template>
            <template #content>
              <div v-for="exp in experiences" :key="exp" class="form-check">
                <UCheckbox
                  v-model="filtres.experiencerequisecheckbox"
                  :value="exp"
                  >{{ exp }}</UCheckbox
                >
              </div>
            </template>
          </UAccordionItem>
          <UAccordionItem>
            <template #title>Mots-clés</template>
            <template #content>
              <UInput
                v-model="filtres.motsCles"
                placeholder="Entrez des mots-clés"
              />
            </template>
          </UAccordionItem>
        </UAccordion>
        <UButton @click="reinitialiserFiltres" class="mt-3"
          >Réinitialiser tous les filtres</UButton
        >
      </div>

      <div class="column is-8-desktop">
        <div class="emplois-liste">
          <div class="columns">
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCarouselHomepageEmplois } from "@/composables/useCarouselHomepageEmplois";
import { useRoute } from "vue-router";
import EmploiCard from "@/components/emploiCard.vue";

const { data: emplois } = useCarouselHomepageEmplois();
const route = useRoute();

const filtres = ref({
  titre: "",
  geolocalisation: "",
  type: "",
  experiencerequise: "",
  typeCheckbox: [],
  experiencerequisecheckbox: [],
  motsCles: "",
});

const currentPage = ref(1);
const emploisPerPage = 4;

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
      !filtres.value.motsCles ||
      emploi.motsCles.some((mc) =>
        mc.mot.toLowerCase().includes(filtres.value.motsCles.toLowerCase())
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
    motsCles: "",
  };
  appliquerFiltres();
};

onMounted(() => {
  const searchQuery = route.query.titre;
  if (searchQuery) {
    filtres.value.titre = searchQuery;
    appliquerFiltres();
  }
  //accordéonn
});
</script>

<style scoped>
.offres-emploi {
  padding: 20px;
}

.filtres {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.emplois-liste {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.accordion-button {
  background-color: #f8f9fa;
  color: #212529;
  padding: 15px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
}

.accordion-button:hover {
  background-color: #e9ecef;
}

.accordion-button:after {
  content: "\002B";
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.accordion-button.active:after {
  content: "\2212";
}

.accordion-body {
  padding: 0 15px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.accordion-body.show {
  max-height: 500px;
}
</style>
