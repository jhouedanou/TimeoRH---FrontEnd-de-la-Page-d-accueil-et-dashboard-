<template id="appeloki">
  <home-page-header />
  <Banner />
  <div class="offremploi-container container">
    <div class="offres-emploi">
      <form @submit.prevent="appliquerFiltres" class="filtres">
        <div class="Trouvez-le-job-correspondant-votre-profil">
          Trouvez le job correspondant à votre profil
        </div>
        <div class="columns kaihones">
          <div class="column is-12-mobile w20 input-wrapper">
            <input
              v-model="filtres.titre"
              list="titres"
              placeholder="Titre du poste"
              id="titreinp"
            />
            <span
              v-if="filtres.titre"
              class="clear-input"
              @click="filtres.titre = ''"
            >
              <span class="material-icons">close</span>
            </span>
            <datalist id="titres">
              <option v-for="titre in titres" :key="titre" :value="titre" />
            </datalist>
          </div>

          <div class="column is-12-mobile w20 input-wrapper">
            <input
              v-model="filtres.geolocalisation"
              list="localisations"
              placeholder="Localisation"
              id="localisation"
            />
            <span
              v-if="filtres.geolocalisation"
              class="clear-input"
              @click="filtres.geolocalisation = ''"
            >
              <span class="material-icons">close</span>
            </span>
            <datalist id="localisations">
              <option v-for="loc in localisations" :key="loc" :value="loc" />
            </datalist>
          </div>

          <div class="column is-12-mobile w20 input-wrapper">
            <select id="typecont" v-model="filtres.type">
              <option value="">Type de contrat</option>
              <option v-for="type in types" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <span
              v-if="filtres.type"
              class="clear-input"
              @click="filtres.type = ''"
            >
              <span class="material-icons">close</span>
            </span>
          </div>

          <div class="column is-12-mobile w20 input-wrapper">
            <select id="exper" v-model="filtres.experiencerequise">
              <option value="">Expérience requise</option>
              <option v-for="exp in experiences" :key="exp" :value="exp">
                {{ exp }}
              </option>
            </select>
            <span
              v-if="filtres.experiencerequise"
              class="clear-input"
              @click="filtres.experiencerequise = ''"
            >
              <span class="material-icons">close</span>
            </span>
          </div>

          <div class="column">
            <button class="luka" type="submit">
              <img src="/images/searchBtn.svg" alt="Search bouton" />
            </button>
          </div>
        </div>
      </form>

      <div class="columns">
   
        <div class="filtrewrapper column is-3-desktop">
    <h3 class="apro">Filtres</h3>
    <div class="accordion">
      <!-- Intitulé du poste -->
      <div class="accordion-item">
        <button class="accordion-header" @click="toggleAccordion($event)">
          Intitulé du poste
          <span class="arrow-icon">&#9662;</span>
        </button>
        <div class="accordion-content">
          <input v-model="filtres.titre" placeholder="Intitulé du poste" />
        </div>
      </div>

      <!-- Diplômes/niveau d'études -->
      <div class="accordion-item">
        <button class="accordion-header" @click="toggleAccordion($event)">
          Diplômes/niveau d'études
          <span class="arrow-icon">&#9662;</span>
        </button>
        <div class="accordion-content">
          <!-- Ajoutez ici les options pour les diplômes/niveau d'études -->
        </div>
      </div>

      <!-- Expérience professionnelle requise -->
      <div class="accordion-item">
        <button class="accordion-header" @click="toggleAccordion($event)">
          Expérience professionnelle requise
          <span class="arrow-icon">&#9662;</span>
        </button>
        <div class="accordion-content">
          <div v-for="exp in experiencesWithCount" :key="exp.value" class="form-check">
            <input type="checkbox" :id="exp.value" v-model="filtres.experiencerequisecheckbox" :value="exp.value" />
            <label :for="exp.value">{{ exp.value }} ({{ exp.count }})</label>
          </div>
        </div>
      </div>

      <!-- Type de contrat -->
      <div class="accordion-item">
        <button class="accordion-header" @click="toggleAccordion($event)">
          Type de contrat
          <span class="arrow-icon">&#9662;</span>
        </button>
        <div class="accordion-content">
          <div v-for="type in typesWithCount" :key="type.value" class="form-check">
            <input type="checkbox" :id="type.value" v-model="filtres.typeCheckbox" :value="type.value" />
            <label :for="type.value">{{ type.value }} ({{ type.count }})</label>
          </div>
        </div>
      </div>

      <!-- Compétences techniques requises -->
      <div class="accordion-item">
        <button class="accordion-header" @click="toggleAccordion($event)">
          Compétences techniques requises
          <span class="arrow-icon">&#9662;</span>
        </button>
        <div class="accordion-content">
          <p class="mango">Veuillez saisir une ou plusieurs compétences</p>
          <div class="keywords-input">
            <!-- ... code existant pour les mots-clés ... -->
          </div>
        </div>
      </div>

      <!-- Secteur d'activité -->
      <div class="accordion-item">
        <button class="accordion-header" @click="toggleAccordion($event)">
          Secteur d'activité
          <span class="arrow-icon">&#9662;</span>
        </button>
        <div class="accordion-content">
          <!-- Ajoutez ici les options pour le secteur d'activité -->
        </div>
      </div>

      <!-- Localisation -->
      <div class="accordion-item">
        <button class="accordion-header" @click="toggleAccordion($event)">
          Localisation
          <span class="arrow-icon">&#9662;</span>
        </button>
        <div class="accordion-content">
          <input v-model="filtres.geolocalisation" placeholder="Localisation" />
        </div>
      </div>
    </div>      </div>

        <div id="pensakola" class="column is-9-desktop">
          <div class="nombre-posts">
            Postes correspondants : {{ emploisFiltres.total }}
          </div>
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
                class="column is-4-desktop is-12-tablet is-12-mobile"
              />
            </div>
          </div>

          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
              Précédent
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="{ active: currentPage === page }"
            >
              {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="footer">
    <div class="columns is-desktop">
      <div
        class="column is-6-desktop is-12-mobile is-flex is-align-items-center is-flex-direction-column is-justify-content-center recruitcolumn"
      >
        <p>© {{ currentYear }} TimeoRH</p>
      </div>
      <div
        class="column is-6-desktop is-12-mobile is-flex is-align-items-center is-flex-direction-column is-justify-content-center recruitcolumn"
      >
        <p>Fait avec ❤️ en Afrique</p>
      </div>
    </div>
  </footer>
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
const emploisPerPage = 6;
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
          new RegExp(mot.toLowerCase().replace(/\*/g, ".*"), "i").test(
            mc.mot.toLowerCase()
          )
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
  //smooth scroll dans la div des emplois filtrés
  nextTick(() => {
    const pensakola = document.getElementById("pensakola");
    if (pensakola) {
      pensakola.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
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
  const header = event.currentTarget;
  header.classList.toggle("active");
  const content = header.nextElementSibling;
  if (content) {
    content.style.maxHeight = content.style.maxHeight
      ? null
      : `${content.scrollHeight}px`;
  }
};

const addKeyword = () => {
  if (newKeyword.value.trim()) {
    filtres.value.motsCles.push(newKeyword.value.trim().toLowerCase());
    newKeyword.value = "";
  }
};

const removeKeyword = (index) => {
  filtres.value.motsCles.splice(index, 1);
};
const noResults = computed(() => emploisFiltres.value.total === 0);
const typesWithCount = computed(() => {
  return types.value.map((type) => ({
    value: type,
    count: emplois.value.filter((e) => e.typeDeContrat === type).length,
  }));
});

const experiencesWithCount = computed(() => {
  return experiences.value.map((exp) => ({
    value: exp,
    count: emplois.value.filter((e) => e.experienceRequise === exp).length,
  }));
});

onMounted(() => {
  document.body.id = "offres";

  const searchQuery = route.query.titre;
  if (searchQuery) {
    filtres.value.titre = searchQuery;
    appliquerFiltres();
  }
});
const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss">
.offres-emploi {
  padding: 20px;
}

.filtres {
  gap: 10px;
  margin-bottom: 20px;
  margin-top: -86px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.form-check input[type="checkbox"] {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: solid 1px #e7e6e6;
  background-color: #fdfeff;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

.form-check input[type="checkbox"]:checked {
  background-color: #ffffff;
  position: relative;
}

.form-check input[type="checkbox"]:checked::before {
  content: "\2714";
  font-size: 24px;
  color: black;
  position: absolute;
  right: 5px;
  top: 0;
}
.input-wrapper {
  position: relative;

  .clear-input {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    .material-icons {
      font-size: 18px;
      color: #999;
    }
  }
}
.clear-input {
  background: #eee;
  color: #999;
  display: flex;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  right: 16px !important;
}
</style>
