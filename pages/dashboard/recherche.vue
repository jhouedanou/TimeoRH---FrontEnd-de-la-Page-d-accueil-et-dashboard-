<template>
  <div>
    <div id="dave" class="columns">
      <div class="column is-8 desktop is-12-mobile">
        <button
          @click="resetFilters"
          :disabled="!isAnyFilterActive"
          class="button is-info"
        >
          Réinitialiser les filtres
        </button>

        <div class="wholefilters">
          <select v-model="dropdownFilters.education">
            <option value="">Tous les niveaux d'éducation</option>
            <option v-for="edu in uniqueEducations" :key="edu" :value="edu">
              {{ edu }}
            </option>
          </select>
          <select v-model="dropdownFilters.geolocalisation">
            <option value="">Toutes les localisations</option>
            <option
              v-for="geo in uniqueGeolocalisations"
              :key="geo"
              :value="geo"
            >
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
            <option
              v-for="sit in uniqueSituationsProfessionnelles"
              :key="sit"
              :value="sit"
            >
              {{ sit }}
            </option>
          </select>
        </div>
        <table class="table is-fullwidth" v-if="data">
          <thead>
            <tr>
              <th @click="sortBy('titre')">Titre</th>
              <th @click="sortBy('nom')">Nom et Prénom</th>
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
              <td>{{ candidat.titre }}</td>
              <td>{{ `${candidat.nom} ${candidat.prenom}` }}</td>
              <td>{{ candidat.experience }}</td>
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
      <div class="searchFilters column is-4-desktop">
        <div class="filter-section">
          <h3 @click="toggleFilter('education')" class="filter-title">
            Éducation
          </h3>
          <div v-if="filters.education.isOpen" class="filter-content">
            <div v-for="edu in uniqueEducations" :key="edu">
              <label>
                <input
                  type="checkbox"
                  v-model="filters.education.selected"
                  :value="edu"
                />
                {{ edu }}
              </label>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <h3 @click="toggleFilter('geolocalisation')" class="filter-title">
            Géolocalisation
          </h3>
          <div v-if="filters.geolocalisation.isOpen" class="filter-content">
            <div v-for="geo in uniqueGeolocalisations" :key="geo">
              <label>
                <input
                  type="checkbox"
                  v-model="filters.geolocalisation.selected"
                  :value="geo"
                />
                {{ geo }}
              </label>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <h3 @click="toggleFilter('experience')" class="filter-title">
            Expérience
          </h3>
          <div v-if="filters.experience.isOpen" class="filter-content">
            <div v-for="exp in uniqueExperiences" :key="exp">
              <label>
                <input
                  type="checkbox"
                  v-model="filters.experience.selected"
                  :value="exp"
                />
                {{ exp }} ans
              </label>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <h3 @click="toggleFilter('competences')" class="filter-title">
            Compétences
          </h3>
          <div v-if="filters.competences.isOpen" class="filter-content">
            <div v-for="comp in uniqueCompetences" :key="comp" class="chip">
              <label
                :class="{
                  selected: filters.competences.selected.includes(comp),
                }"
              >
                <input
                  type="checkbox"
                  v-model="filters.competences.selected"
                  :value="comp"
                />
                {{ comp }}
              </label>
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

          <div
            class="columns infordetaillecandidat is-flex is-flex-direction-column"
          >
            <div class="macine column is-12-desktop is-12-mobile">
              <div class="ligne1cv columns is-12 coleen">
                <div
                  class="trunks is-flex is-flex-direction-row column is-12-desktop is-12-mobile"
                >
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
                        <span class="material-icons">person</span
                        >{{ selectedCandidat.titre }}
                      </p>
                      <p class="localisation">
                        <span class="material-icons">location_on</span>
                        {{ selectedCandidat.geolocalisation }}
                      </p>
                      <p class="telephone">
                        <span class="material-icons">phone</span
                        >{{ selectedCandidat.telephone }}
                      </p>
                      <p class="email">
                        <span class="material-icons">email</span
                        >{{ selectedCandidat.email }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="ligne2cv is-12 coleen">
                <p>Taux de remplissage du profil professionnel</p>
                <div class="progress-bar-container">
                  <div
                    class="progress-bar"
                    :style="{
                      width: selectedCandidat.taux_remplissage_profil + '%',
                      transition: 'width 1s ease-out',
                      transformOrigin: 'left',
                    }"
                  ></div>
                  <span
                    class="progress-text"
                    :style="{
                      position: 'absolute',
                      left: selectedCandidat.taux_remplissage_profil + '%',
                      top: 0,
                      bottom: 0,
                      transform: 'translateX(-50%)',
                      transition: 'left 1s ease-out',
                    }"
                  >
                    {{ selectedCandidat.taux_remplissage_profil }}%
                  </span>
                </div>
              </div>

              <div class="ligne4cv">
                <div class="lacie">
                  <h3>Compétences :</h3>
                  <ul>
                    <li
                      v-for="(
                        competence, index
                      ) in selectedCandidat.competences"
                      :key="index"
                    >
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
                    <li
                      v-for="(diplome, index) in selectedCandidat.education"
                      :key="index"
                    >
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
                    <li
                      v-for="(point, index) in selectedCandidat.points_forts"
                      :key="index"
                    >
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
                    <a
                      :href="selectedCandidat.cv"
                      target="_blank"
                      class="document-button"
                    >
                      <button>CV</button>
                    </a>
                    <a
                      :href="selectedCandidat.lettre_motivation"
                      target="_blank"
                      class="document-button"
                    >
                      <button>Lettre de motivation</button>
                    </a>
                    <a
                      :href="selectedCandidat.portfolio"
                      target="_blank"
                      class="document-button"
                    >
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

//filtres par barre latérale
const filters = ref({
  education: { isOpen: false, selected: [] },
  geolocalisation: { isOpen: false, selected: [] },
  experience: { isOpen: false, selected: [] },
  competences: { isOpen: false, selected: [] },
});

const dropdownFilters = ref({
  education: "",
  geolocalisation: "",
  experience: "",
  situationProfessionnelle: "",
});

const toggleFilter = (filterName) => {
  filters.value[filterName].isOpen = !filters.value[filterName].isOpen;
};

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
    return (
      matchesSearch &&
      matchesCompetence &&
      educationMatch &&
      geoMatch &&
      expMatch &&
      compMatch &&
      sitMatch &&
      searchMatch
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
    Object.values(filters.value).some((filter) => filter.selected.length > 0) ||
    searchQuery.value !== ""
  );
});

const resetFilters = () => {
  router.push({ path: route.path });

  Object.keys(dropdownFilters.value).forEach((key) => {
    dropdownFilters.value[key] = "";
  });
  Object.keys(filters.value).forEach((key) => {
    filters.value[key].selected = [];
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

<style lang="scss">
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
  background: rgba(249, 231, 190, 0.42) url(/images/star-svgrepo-com.svg) center
    left no-repeat;
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

  filter: alpha(opacity=50); /* internet explorer */
  -khtml-opacity: 0.5; /* khtml, old safari */
  -moz-opacity: 0.5; /* mozilla, netscape */
  opacity: 0.5; /* fx, safari, opera */
  &:hover {
    filter: alpha(opacity=100); /* internet explorer */
    -khtml-opacity: 1; /* khtml, old safari */
    -moz-opacity: 1; /* mozilla, netscape */
    opacity: 1; /* fx, safari, opera */
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
</style>
