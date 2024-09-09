<template>
  <div>
    <div class="poste">
      <div class="bull">{{ searchTerms.join(", ") }}</div>
      <div class="shi">Profils correspondants : {{ totalElements }}</div>
    </div>
    <!-- <div class="wholefilters">
      <select v-model="dropdownFilters.education">
        <option value="">Tous les niveaux d'éducation</option>
        <option v-for="edu in uniqueEducations" :key="edu" :value="edu">
          {{ edu }}
        </option>
      </select>
      <select v-model="dropdownFilters.geolocalisation">
        <option value="">Toutes les localisations</option>
        <option v-for="geo in uniqueGeolocalisations" :key="geo" :value="geo">
          {{ geo }}
        </option>
      </select>
      <select v-model="dropdownFilters.experience">
        <option value="">Toutes les expériences</option>
        <option v-for="exp in uniqueExperiences" :key="exp" :value="exp">
          {{ exp }} ans
        </option>
      </select>
      <select v-model="dropdownFilters.situationProfessionnelle">
        <option value="">Toutes les situations professionnelles</option>
        <option v-for="sit in uniqueSituationsProfessionnelles" :key="sit" :value="sit">
          {{ sit }}
        </option>
      </select>
    </div> -->
    <div id="dave" class="columns">
      <div class="column is-8-desktop is-12-mobile">
        <button @click="resetFilters" :disabled="!isAnyFilterActive" class="button is-info raptor">
          Réinitialiser les filtres
        </button>
        <div class="table-container">
          <table class="table is-fullwidth is-striped is-responsive" v-if="data">
            <thead>
              <tr>
                <th @click="sortBy('nom')">Nom et Prénom</th>
                <th @click="sortBy('titre')">Titre</th>
                <th @click="sortBy('education')">Niveau d'éducation</th>
                <th @click="sortBy('experience')">Expérience</th>
                <th @click="sortBy('geolocalisation')">Géolocalisation</th>
                <th @click="sortBy('situationProfessionnelle')">
                  Situation Professionnelle
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="candidat in paginatedCandidats" :key="candidat.id">
                <td>{{ `${candidat.nom} ${candidat.prenom}` }}</td>
                <td>{{ candidat.titre }}</td>
                <td>{{ candidat.education.join(", ") }}</td>
                <td>{{ candidat.experience }} ans</td>
                <td>{{ candidat.geolocalisation }}</td>
                <td>{{ candidat.situationProfessionnelle }}</td>
                <td>
                  <button @click="openPopup(candidat)" class="button is-primary">
                    Voir le profil
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
              Précédent
            </button>
            <span>Page {{ currentPage }} sur {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              Suivant
            </button>
          </div>
          <div class="total-elements">
            Affichage de {{ startIndex + 1 }}-{{ endIndex }} sur
            {{ totalElements }} éléments
          </div>
        </div>
      </div>
      <div class="searchFilters column is-4-desktop is-12-mobile">
        <div class="filter-section">
          <h3 @click="toggleFilter('education')" class="filter-title">
            Éducation
            <span class="arrow" :class="{
              'arrow-up': !filters.education.isOpen,
              'arrow-down': filters.education.isOpen,
            }">▼</span>
          </h3>

          <div v-if="filters.education.isOpen" class="filter-content">
            <div v-for="edu in uniqueEducations" :key="edu">
              <label>
                <input type="checkbox" v-model="filters.education.selected" :value="edu" />
                {{ edu }}
              </label>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <h3 @click="toggleFilter('geolocalisation')" class="filter-title">
            Géolocalisation
            <span class="arrow" :class="{
              'arrow-up': !filters.geolocalisation.isOpen,
              'arrow-down': filters.geolocalisation.isOpen,
            }">▼</span>
          </h3>
          <div v-if="filters.geolocalisation.isOpen" class="filter-content">
            <div v-for="geo in uniqueGeolocalisations" :key="geo">
              <label>
                <input type="checkbox" v-model="filters.geolocalisation.selected" :value="geo" />
                {{ geo }}
              </label>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <h3 @click="toggleFilter('experience')" class="filter-title">
            Expérience
            <span class="arrow" :class="{
              'arrow-up': !filters.experience.isOpen,
              'arrow-down': filters.experience.isOpen,
            }">▼</span>
          </h3>
          <div v-if="filters.experience.isOpen" class="filter-content">
            <div v-for="exp in uniqueExperiences" :key="exp">
              <label>
                <input type="checkbox" v-model="filters.experience.selected" :value="exp" />
                {{ exp }} ans
              </label>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <h3 @click="toggleFilter('competences')" class="filter-title">
            Compétences
            <span class="arrow" :class="{
              'arrow-up': !filters.competences.isOpen,
              'arrow-down': filters.competences.isOpen,
            }">▼</span>
          </h3>
          <div v-if="filters.competences.isOpen" class="filter-content">
            <div v-for="comp in uniqueCompetences" :key="comp" class="chip">
              <label :class="{
                selected: filters.competences.selected.includes(comp),
              }">
                <input type="checkbox" v-model="filters.competences.selected" :value="comp" />
                {{ comp }}
              </label>
            </div>
          </div>
        </div>
        <!-- Experience Spécifique Titre -->
        <div class="filter-section">
          <h3 @click="toggleFilter('experienceSpecifiqueTitre')" class="filter-title">
            Expérience Spécifique
            <span class="arrow"
              :class="{ 'arrow-up': !filters.experienceSpecifiqueTitre.isOpen, 'arrow-down': filters.experienceSpecifiqueTitre.isOpen }">▼</span>
          </h3>
          <div v-if="filters.experienceSpecifiqueTitre.isOpen" class="filter-content">
            <input v-model="filters.experienceSpecifiqueTitre.value" list="experienceSpecifiqueTitres"
              placeholder="Titre de l'expérience">
            <datalist id="experienceSpecifiqueTitres">
              <option v-for="titre in uniqueExperienceSpecifiqueTitres" :key="titre" :value="titre" />
            </datalist>
          </div>
        </div>


        <!-- Années d'expérience professionnelle -->
        <div class="filter-section">
          <h3 @click="toggleFilter('anneesExperience')" class="filter-title">
            Années d'expérience professionnelle
            <span class="arrow"
              :class="{ 'arrow-up': !filters.anneesExperience.isOpen, 'arrow-down': filters.anneesExperience.isOpen }">▼</span>
          </h3>
          <div v-if="filters.anneesExperience.isOpen" class="filter-content">
            <input v-model="filters.anneesExperience.max" type="range" min="0" max="50" step="1">
            <span>Max: {{ filters.anneesExperience.max }} ans</span>
          </div>
        </div>

        <!-- Années d'expérience en tant que manager -->
        <div class="filter-section">
          <h3 @click="toggleFilter('anneesExperienceManager')" class="filter-title">
            Années d'expérience en tant que manager
            <span class="arrow"
              :class="{ 'arrow-up': !filters.anneesExperienceManager.isOpen, 'arrow-down': filters.anneesExperienceManager.isOpen }">▼</span>
          </h3>
          <div v-if="filters.anneesExperienceManager.isOpen" class="filter-content">
            <input v-model="filters.anneesExperienceManager.max" type="range" min="0" max="50" step="1">
            <span>Max: {{ filters.anneesExperienceManager.max }} ans</span>
          </div>
        </div>


        <!-- Mission principale -->
        <div class="filter-section">
          <h3 @click="toggleFilter('missionPrincipale')" class="filter-title">
            Mission principale
            <span class="arrow"
              :class="{ 'arrow-up': !filters.missionPrincipale.isOpen, 'arrow-down': filters.missionPrincipale.isOpen }">▼</span>
          </h3>
          <div v-if="filters.missionPrincipale.isOpen" class="filter-content">
            <div v-for="mission in uniqueMissionsPrincipales" :key="mission" class="form-check">
              <input type="checkbox" :id="mission" v-model="filters.missionPrincipale.selected" :value="mission">
              <label :for="mission">{{ mission }}</label>
            </div>
          </div>
        </div>

        <!-- Activités liées -->
        <div class="filter-section">
          <h3 @click="toggleFilter('activitesLiees')" class="filter-title">
            Activités liées
            <span class="arrow"
              :class="{ 'arrow-up': !filters.activitesLiees.isOpen, 'arrow-down': filters.activitesLiees.isOpen }">▼</span>
          </h3>
          <div v-if="filters.activitesLiees.isOpen" class="filter-content">
            <div v-for="activite in uniqueActivitesLiees" :key="activite" class="form-check">
              <input type="checkbox" :id="activite" v-model="filters.activitesLiees.selected" :value="activite">
              <label :for="activite">{{ activite }}</label>
            </div>
          </div>
        </div>

        <!-- Compétences -->
        <div class="filter-section">
          <h3 @click="toggleFilter('competences')" class="filter-title">
            Compétences
            <span class="arrow"
              :class="{ 'arrow-up': !filters.competences.isOpen, 'arrow-down': filters.competences.isOpen }">▼</span>
          </h3>
          <div v-if="filters.competences.isOpen" class="filter-content">
            <div v-for="competence in uniqueCompetences" :key="competence" class="form-check">
              <input type="checkbox" :id="competence" v-model="filters.competences.selected" :value="competence">
              <label :for="competence">{{ competence }}</label>
            </div>
          </div>
        </div>

        <!-- Langues -->
        <div class="filter-section">
          <h3 @click="toggleFilter('langues')" class="filter-title">
            Langues
            <span class="arrow"
              :class="{ 'arrow-up': !filters.langues.isOpen, 'arrow-down': filters.langues.isOpen }">▼</span>
          </h3>
          <div v-if="filters.langues.isOpen" class="filter-content">
            <div v-for="langue in uniqueLangues" :key="langue" class="langue-filter">
              <h4>{{ langue }}</h4>
              <div>
                <select v-model="filters.langues.selected[langue].expression">
                  <option value="">Expression</option>
                  <option value="Oral">Oral</option>
                  <option value="Écrit">Écrit</option>
                  <option value="Oral et écrit">Oral et écrit</option>
                </select>
                <select v-model="filters.langues.selected[langue].niveau">
                  <option value="">Niveau</option>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Courant">Courant</option>
                  <option value="Natif">Natif</option>
                </select>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <div v-if="showPopup" class="popup">
        <div class="popup-content">
          <button class="todd" @click="showPopup = false">
            <span class="material-icons">close</span>
          </button>

          <div class="columns infordetaillecandidat is-flex is-flex-direction-column">
            <div class="macine column is-12-desktop is-12-mobile">
              <div class="ligne1cv columns is-12 coleen">
                <div class="trunks is-flex is-flex-direction-row column is-12-desktop is-12-mobile">
                  <img :src="selectedCandidat.image" alt="" />
                  <div class="neay is-flex is-flex-direction-column">
                    <h2>
                      {{ selectedCandidat.nom }} {{ selectedCandidat.prenom }}
                    </h2>
                    <h4>{{ selectedCandidat.appreciation }}</h4>
                    <div class="lola-luv p-1">
                      <p v-if="titre > 80" class="candidat-parfait">
                        Candidat parfait
                      </p>
                      <p>
                        <span class="material-icons">person</span>{{ selectedCandidat.titre }}
                      </p>
                      <p class="localisation">
                        <span class="material-icons">location_on</span>
                        {{ selectedCandidat.geolocalisation }}
                      </p>

                      <p class="telephone">
                        <a :href="'tel:' + selectedCandidat.telephone"></a>
                        <span class="material-icons">phone</span>{{ selectedCandidat.telephone }}
                      </p>
                      <p class="email">
                        <a :href="'mailto:' + selectedCandidat.email" target="_blank">
                          <span class="material-icons">email</span>
                          {{ selectedCandidat.email }}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="ligne2cv is-12 coleen">
                <p>Taux de remplissage du profil professionnel</p>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{
                    width: selectedCandidat.taux_remplissage_profil + '%',
                    transition: 'width 1s ease-out',
                    transformOrigin: 'left',
                  }"></div>
                  <span class="progress-text" :style="{
                    position: 'absolute',
                    left: selectedCandidat.taux_remplissage_profil + '%',
                    top: 0,
                    bottom: 0,
                    transform: 'translateX(-50%)',
                    transition: 'left 1s ease-out',
                  }">
                    {{ selectedCandidat.taux_remplissage_profil }}%
                  </span>
                </div>
              </div>

              <div class="ligne4cv">
                <div class="lacie">
                  <h3>Compétences :</h3>
                  <ul>
                    <li v-for="(
                        competence, index
                      ) in selectedCandidat.competences" :key="index">
                      {{ competence
                      }}{{
                        index !== selectedCandidat.competences.length - 1
                          ? ","
                          : ""
                      }}
                    </li>
                  </ul>
                </div>
                <div class="lacie">
                  <h3>Diplômes :</h3>
                  <ul>
                    <li v-for="(diplome, index) in selectedCandidat.education" :key="index">
                      {{ diplome
                      }}{{
                        index !== selectedCandidat.education.length - 1
                          ? ","
                          : ""
                      }}
                    </li>
                  </ul>
                </div>
                <div class="lacie">
                  <h3>Points forts :</h3>
                  <ul>
                    <li v-for="(point, index) in selectedCandidat.points_forts" :key="index">
                      {{ point }}
                    </li>
                  </ul>
                </div>
                <div class="lacie">
                  <h3>Expérience professionnelle :</h3>
                  <p>{{ selectedCandidat.experience }} ans</p>
                </div>
                <div class="documentsducandidat">
                  <div class="h4">Documents</div>
                  <div class="wrapperdoc">
                    <a :href="selectedCandidat.cv" target="_blank" class="document-button">
                      <button>CV</button>
                    </a>
                    <a :href="selectedCandidat.lettre_motivation" target="_blank" class="document-button">
                      <button>Lettre de motivation</button>
                    </a>
                    <a :href="selectedCandidat.portfolio" target="_blank" class="document-button">
                      <button>Portfolio</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCandidatsJson } from "@/composables/useCandidats";

const route = useRoute();
const router = useRouter();
const searchQuery = ref("");
const { data } = useCandidatsJson();
const sortKey = ref("titre");
const sortOrder = ref("asc");
const showPopup = ref(false);
const selectedCandidat = ref(null);
const competenceFilter = ref("");
const isCollapsed = ref(true);

const uniqueEducations = computed(() => {
  return [...new Set(data.value.flatMap((c) => c.education))];
});

const uniqueGeolocalisations = computed(() => {
  return [...new Set(data.value.map((c) => c.geolocalisation))];
});

const uniqueExperiences = computed(() => {
  return [...new Set(data.value.map((c) => c.experience))];
});

const uniqueCompetences = computed(() => {
  return [...new Set(data.value.flatMap((c) => c.competences))];
});
const uniqueSituationsProfessionnelles = computed(() => {
  return [...new Set(data.value.map((c) => c.situationProfessionnelle))];
});
const uniqueExperienceSpecifiqueTitres = computed(() => {
  return [...new Set(data.value.flatMap(c => c.experienceSpecifique.map(e => e.titre)))];
});


const uniqueMissionsPrincipales = computed(() => {
  return [...new Set(data.value.map(c => c.mission_principale))];
});

const uniqueActivitesLiees = computed(() => {
  return [...new Set(data.value.flatMap(c => c.activites_liees_au_poste))];
});


const uniqueLangues = computed(() => {
  return [...new Set(data.value.flatMap(c => c.langues.map(l => l.langue)))];
});
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const searchTerms = computed(() => {
  const terms = [];

  // Termes de l'URL
  if (route.query.q) terms.push(route.query.q);
  if (route.query.competence) terms.push(route.query.competence);

  // Filtres de la barre latérale
  Object.entries(filters.value).forEach(([key, filter]) => {
    if (filter.selected && filter.selected.length > 0) {
      terms.push(...filter.selected);
    }
  });

  // Filtres déroulants
  Object.entries(dropdownFilters.value).forEach(([key, value]) => {
    if (value) {
      terms.push(value);
    }
  });

  return [...new Set(terms)]; // Éliminer les doublons
});

const initializeFilters = () => {
  return {
    education: { isOpen: true, selected: [] },
    geolocalisation: { isOpen: false, selected: [] },
    experience: { isOpen: false, selected: [] },
    competences: { isOpen: false, selected: [] },
    experienceSpecifiqueTitre: { isOpen: false, value: '' },
    anneesExperience: { isOpen: false, min: null, max: null },
    anneesExperienceManager: { isOpen: false, min: null, max: null },
    missionPrincipale: { isOpen: false, selected: [] },
    activitesLiees: { isOpen: false, selected: [] },
    langues: {
      isOpen: false,
      selected: Object.fromEntries(uniqueLangues.value.map(lang => [lang, { expression: '', niveau: '' }]))
    },
  };
};

const filters = ref(initializeFilters());

const dropdownFilters = ref({
  education: "",
  geolocalisation: "",
  experience: "",
  situationProfessionnelle: "",
});

const toggleFilter = (filterName) => {
  filters.value[filterName].isOpen = !filters.value[filterName].isOpen;



};



//popup

const openPopup = (candidat) => {
  selectedCandidat.value = candidat;
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
  selectedCandidat.value = null;
};

//pagination
const itemsPerPage = 4;
const currentPage = ref(1);
const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};

const filteredCandidats = computed(() => {
  return data.value.filter((candidat) => {
    const educationMatch =
      (filters.value.education.selected.length === 0 ||
        candidat.education.some((edu) =>
          filters.value.education.selected.includes(edu)
        )) &&
      (!dropdownFilters.value.education ||
        candidat.education.includes(dropdownFilters.value.education));

    const geoMatch =
      (filters.value.geolocalisation.selected.length === 0 ||
        filters.value.geolocalisation.selected.includes(
          candidat.geolocalisation
        )) &&
      (!dropdownFilters.value.geolocalisation ||
        candidat.geolocalisation === dropdownFilters.value.geolocalisation);

    const expMatch =
      (filters.value.experience.selected.length === 0 ||
        filters.value.experience.selected.includes(candidat.experience)) &&
      (!dropdownFilters.value.experience ||
        candidat.experience === parseInt(dropdownFilters.value.experience));

    const compMatch =
      filters.value.competences.selected.length === 0 ||
      candidat.competences.some((comp) =>
        filters.value.competences.selected.includes(comp)
      );

    const sitMatch =
      !dropdownFilters.value.situationProfessionnelle ||
      candidat.situationProfessionnelle ===
      dropdownFilters.value.situationProfessionnelle;

    const searchMatch =
      !searchQuery.value ||
      Object.values(candidat).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    const matchesCompetence =
      !competenceFilter.value ||
      candidat.competences.includes(competenceFilter.value);

    const matchesSearch = Object.values(candidat).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    );



    const matchExperienceSpecifiqueTitre = !filters.value.experienceSpecifiqueTitre.value ||
      candidat.experienceSpecifique.some(e => e.titre.toLowerCase().includes(filters.value.experienceSpecifiqueTitre.value.toLowerCase()));

    const matchEducation = filters.value.education.selected.length === 0 ||
      candidat.education.some(e => filters.value.education.selected.includes(e.diplome));

    const totalExperience = candidat.experienceSpecifique.reduce((sum, exp) => sum + exp.duree, 0);
    const matchAnneesExperience = !filters.value.anneesExperience.max || totalExperience <= filters.value.anneesExperience.max;
    const totalManagerExperience = candidat.experienceSpecifique.filter(exp => exp.manager).reduce((sum, exp) => sum + exp.duree, 0);
    const matchAnneesExperienceManager = !filters.value.anneesExperienceManager.max || totalManagerExperience <= filters.value.anneesExperienceManager.max;



    const matchMissionPrincipale = filters.value.missionPrincipale.selected.length === 0 ||
      filters.value.missionPrincipale.selected.includes(candidat.mission_principale);

    const matchActivitesLiees = filters.value.activitesLiees.selected.length === 0 ||
      filters.value.activitesLiees.selected.every(activite => candidat.activites_liees_au_poste.includes(activite));

    const matchCompetences = filters.value.competences.selected.length === 0 ||
      filters.value.competences.selected.every(comp => candidat.competences.includes(comp));

    const matchLangues = Object.keys(filters.value.langues.selected).length === 0 ||
      Object.entries(filters.value.langues.selected).every(([langue, criteria]) => {
        const candidatLangue = candidat.langues.find(l => l.langue === langue);
        return candidatLangue &&
          (!criteria.expression || candidatLangue.expression === criteria.expression) &&
          (!criteria.niveau || candidatLangue.niveau === criteria.niveau);
      });

    return (
      matchesSearch &&
      matchesCompetence &&
      educationMatch &&
      geoMatch &&
      expMatch &&
      compMatch &&
      sitMatch &&
      searchMatch && matchExperienceSpecifiqueTitre && matchEducation && matchAnneesExperience &&
      matchAnneesExperienceManager && matchMissionPrincipale && matchActivitesLiees &&
      matchCompetences && matchLangues
    );
  });
});
const sortedCandidats = computed(() => {
  return [...filteredCandidats.value].sort((a, b) => {
    let modifier = sortOrder.value === "desc" ? -1 : 1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
    return 0;
  });
  return filtered;
});
//pagination

const totalElements = computed(() => sortedCandidats.value.length);
const totalPages = computed(() =>
  Math.ceil(totalElements.value / itemsPerPage)
);

const paginatedCandidats = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedCandidats.value.slice(start, end);
});

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage, totalElements.value)
);

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
//reinitailiser filters
const isAnyFilterActive = computed(() => {
  return (
    Object.keys(route.query).length > 0 ||
    Object.values(dropdownFilters.value).some((value) => value !== "") ||
    Object.values(filters.value).some((filter) =>
      (filter.selected && filter.selected.length > 0) ||
      (typeof filter.value !== 'undefined' && filter.value !== '') ||
      (typeof filter.min !== 'undefined' && filter.min !== null) ||
      (typeof filter.max !== 'undefined' && filter.max !== null)
    ) ||
    searchQuery.value !== ""
  );
});

const resetFilters = () => {
  router.push({ path: route.path });

  Object.keys(dropdownFilters.value).forEach((key) => {
    dropdownFilters.value[key] = "";
  });
  Object.keys(filters.value).forEach((key) => {
    if (Array.isArray(filters.value[key].selected)) {
      filters.value[key].selected = [];
    }
    if (typeof filters.value[key].value !== 'undefined') {
      filters.value[key].value = '';
    }
    if (typeof filters.value[key].min !== 'undefined') {
      filters.value[key].min = null;
    }
    if (typeof filters.value[key].max !== 'undefined') {
      filters.value[key].max = null;
    }
  });
  searchQuery.value = "";
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
watch(
  () => route.query,
  (newQuery) => {
    searchQuery.value = newQuery.q || "";
    competenceFilter.value = newQuery.competence || "";
  },
  { immediate: true }
);

onMounted(() => {
  searchQuery.value = route.query.q || "";
});
</script>

<style lang="scss" scoped>
.raptor {
  width: 100%;
  margin: 1em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:disabled {
    display: none;
  }
}

.wholefilters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.wholefilters select {
  width: 23%;
}

.filter-section {
  margin-bottom: 1rem;
}

.filter-title {
  cursor: pointer;
  font-weight: bold;
}

.filter-content {
  margin-top: 0.5rem;
}

.chip {
  display: inline-block;
  margin: 0.2rem;
}

.chip label {
  padding: 0.2rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  cursor: pointer;
}

.chip label.selected {
  background-color: #4a4a4a;
  color: white;
}

.chip input {
  display: none;
}

//fin
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.total-elements {
  margin-top: 0.5rem;
  text-align: right;
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
  border-radius: 5px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-button {
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
  background-color: #f3f3f3;
  font-size: 16px;
  font-weight: bold;
  color: #002160;
}

.candidat {
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  border: solid 1px #f3f3f3;
  background-color: #fff;
  margin-bottom: 4em;
  padding: 1.5em;
}

.onez {
  margin-bottom: 2em;

  img {
    object-fit: cover;
  }
}

.twoz {
  padding: 0 1em;

  h3 {
    font-size: 25px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    margin-bottom: 0.5em;
  }

  .titre {
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #a4a4a4;
    margin-bottom: 0.5em;
  }
}

.nfo {
  margin-bottom: 0.5em;

  p {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.9;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
  }
}

.skills-container {
  margin-bottom: 1.5em;
}

.points-forts {
  margin-bottom: 1.5em;

  h4 {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    margin-bottom: 0.5em;
  }

  p {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.9;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    margin-bottom: 0.5em;
  }
}

.levraimatch {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.9;
  letter-spacing: normal;
  text-align: right;

  &::after {
    position: absolute;
    z-index: 10;
  }

  &.match-green {
    color: green;

    &::after {
      content: "";
      display: block;
      height: 36px;
      width: 36px;
      background: url("/images/100.svg");
    }
  }

  &.match-orange {
    color: orange;

    &::after {
      display: block;
      content: "";
      height: 36px;
      width: 36px;
      background: url("/images/101.svg");
    }
  }

  &.match-red {
    color: red;

    &::after {
      display: block;
      content: "";
      height: 36px;
      width: 36px;
      background: url("/images/102.svg");
    }
  }
}

.madjoua {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1.5em;
  flex-flow: row;
  flex-wrap: wrap;
  position: relative;

  p {
    width: 90%;
    height: 45px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    position: relative;

    &::after {
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;
    }
  }
}

.trunks {
  img {
    width: 114px;
    height: 114px;
    border-radius: 100%;
  }
}

.macine {
  margin-top: 1em;
  border-radius: 6px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 2px #d7d7d7;
  background-color: #fff;
  padding: 1em;
  flex-direction: column;

  h2 {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: left;
    color: #012e61;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 14px;
    letter-spacing: normal;
    text-align: left;
    color: #9297a6;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 0.45rem;
  }
}

.neay {
  padding-left: 10px;
}

.candidat-parfait {
  width: 151px;
  height: 30px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 1.5em;
  background: rgba(249, 231, 190, 0.42) url(/images/star-svgrepo-com.svg) center left no-repeat;
}

.brad {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.92;
  letter-spacing: -0.48px;
  text-align: center;
  color: #012e61;
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0 auto;
}

.vegeta {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: normal;
    text-align: center;
    color: #18191c;
    position: relative;
    margin-top: 1em;
  }

  .match {
    position: relative;
  }

  .match-green {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &::after {
        background: url("/images/201.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }

  .match-orange {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &::after {
        background: url("/images/200.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }

  .match-red {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &::after {
        background: url("/images/202.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
}

.progress-bar-container {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  &::after {
    content: "";
    height: 2px;
    width: 100%;
    background: #d7d7d7;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }
}

.progress-bar {
  z-index: 1;
  height: 100%;
  background-color: #dc9756;
  border-radius: 10px;
  height: 10px;
  transition: width 1s ease-in-out;
}

.progress-text {
  z-index: 2;
  width: 33px;
  height: 29px;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  font-weight: bold;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.55;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}

.coleen {
  &:nth-of-type(2) {
    p {
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.43;
      letter-spacing: normal;
      text-align: left;
      color: rgba(0, 0, 0, 0.7);
    }
  }
}

.documentsducandidat {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1em;
  background-color: #f9f8ff;
  border-radius: 5px;
  border: solid 1px #a5aab5;
  background-color: #fff;

  .h4 {
    font-family: "Open Sans", sans-serif;
    width: 100%;
    display: block;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 1em;
    margin-bottom: 1em;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #747474;
  }

  .wrapperdoc {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    gap: 1px;

    a {
      &:nth-of-type(3) {
        button {
          border: #d62828 1px solid !important;
          color: #d62828 !important;

          &:hover {
            background-color: #d62828 !important;
            border: #d62828 1px solid !important;
            color: white !important;
          }
        }
      }

      button {
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2;
        letter-spacing: normal;
        text-align: left;
        color: #005bbe;
        height: 33px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 4px;
        border: solid 1px #005bbe;
        background-color: #f9f9f9;
        margin-right: 1em;

        &:hover {
          background: #005bbe;
          border: #005bbe 1px solid;
          color: white;
        }
      }
    }

    .doc {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      gap: 1em;

      .doc-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: 1em;

        .doc-icon-img {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          gap: 1em;
        }
      }
    }
  }
}

.popup-content {
  position: relative;
  padding: 3em;
}

.todd {
  background: rgb(152, 152, 152);
  color: white;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;

  filter: alpha(opacity=50);
  /* internet explorer */
  -khtml-opacity: 0.5;
  /* khtml, old safari */
  -moz-opacity: 0.5;
  /* mozilla, netscape */
  opacity: 0.5;

  /* fx, safari, opera */
  &:hover {
    filter: alpha(opacity=100);
    /* internet explorer */
    -khtml-opacity: 1;
    /* khtml, old safari */
    -moz-opacity: 1;
    /* mozilla, netscape */
    opacity: 1;
    /* fx, safari, opera */
  }
}

.neay {
  span {
    font-size: 12px;
    margin-right: 10px;
  }
}

.interviewdecision {
  .tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
    margin-bottom: 1em;

    li {
      cursor: pointer;
    }

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      gap: 1em;
      padding: 10px;
      border-radius: 4px;
      border: solid 1px #005bbe;
      background-color: #f9f9f9;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2;
      letter-spacing: normal;
      text-align: left;
      color: #005bbe;

      &:hover {
        background: #005bbe;
        border: #005bbe 1px solid;
        color: white;
      }
    }
  }
}

.tabs {
  border-radius: 7.6px;
  border: solid 1.1px #c6c6c6;
  background-color: #fff;

  li {
    padding: 1em;
    color: black;

    &.active,
    &:hover {
      border-radius: 7.6px;
      background-color: #dc9756;
      color: black;
    }
  }
}

.peyton {
  border-radius: 6.5px;
  border: solid 1.1px #e6e6e6;
  background-color: #fff;

  padding: 1em;

  h3 {
    font-size: 15.2px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #18191c;
    border-bottom: 1px solid #e6e6e6;
  }
}

.peyton {

  input,
  textarea {
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    border-radius: 3px;
    border: solid 1px #a4a4a4;
    background-color: #fff;
  }
}

.filter-content input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  min-width: 30px;
  min-height: 30px;
  border: 2px solid #e7e6e6;
  border-radius: 3px;
  background-color: #fdfeff;
  cursor: pointer;
  position: relative;
  vertical-align: middle;
  margin-right: 8px;
  display: block;
}

.filter-content input[type="checkbox"]:checked {
  background-color: #fff;
  border-color: #000;
}

.filter-content input[type="checkbox"]:checked::after {
  content: "\2714";
  font-size: 14px;
  color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.filter-content label {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
}

.filter-content {
  padding: 1em;

  label {
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #5e6368;
  }
}

.searchFilters {
  border-radius: 10px;
  border: solid 1px #e7e6e6;
  background-color: #fff;
  padding: 0em;

  h3 {
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: 0.4px;
    text-align: left;
    color: #5e6368;
    height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;
    border-top: 1px solid #e7e6e6;
    padding: 1em;
  }
}



/* Style de la barre de défilement pour macOS */
.filter-section::-webkit-scrollbar {
  width: 8px;
}

.filter-section::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

.filter-section::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 10px;
}

.filter-section::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}

.wholefilters {
  select {
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    /* Pour conserver la police du parent */
    padding: 8px 12px;
    /* Pour un meilleur espacement */
    border-radius: 4px;
    /* Pour des coins arrondis */
    border: 1px solid #ccc;
    /* Une bordure légère */
    background-color: #fff;
    /* Fond blanc */
    color: #333;
    /* Couleur de texte foncée */
    appearance: none;
    /* Supprime l'apparence par défaut sur certains navigateurs */
    -webkit-appearance: none;
    /* Pour Safari */
    -moz-appearance: none;
    /* Pour Firefox */
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 98%;
    background-position-y: 50%;

    &::placeholder {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: 0.28px;
      color: rgba(28, 28, 30, 0.72);
    }

    option {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: 0.28px;
      color: rgba(28, 28, 30, 0.72);
    }
  }
}

.filter-section {
  // max-height: 300px;
  // overflow-y: auto;
  padding-right: 10px;
}

.filter-section::-webkit-scrollbar {
  width: 8px;
}

.filter-section::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

.filter-section::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 10px;
}

.filter-section::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}

.filter-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(180deg);
}

.arrow-down {
  transform: rotate(0deg);
}

.table {
  th {
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.11px;
    text-align: left;
    color: #292d32;
  }

  td {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.14px;
    text-align: left;
    color: #292d32;

    button {
      width: 107.8px;
      height: 37px;
      flex-grow: 0;
      padding: 9.5px 8.9px 9.5px 10px;
      border-radius: 19px;
      border: solid 1px #012e61;
      background: rgba(255, 255, 255, 0);
      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #012e61;

      &:hover {
        background: #012e61;
        color: white;
      }
    }
  }
}

.table-container {
  padding: 1em;
  border-radius: 6px;
  border: solid 2px #eceef6;
  background-color: #fff;
}

@media screen and (max-width: 768px) {
  .wholefilters {
    .select {
      width: 50% !important;
    }
  }

  .table-container {
    overflow-x: auto !important;
  }

  .wrapperdoc {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: column !important;

    a {
      display: block !important;
      width: 100% !important;
      margin-bottom: 1em !important;
    }
  }
}
</style>
