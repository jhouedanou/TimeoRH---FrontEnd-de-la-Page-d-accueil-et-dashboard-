<template>
  <div class="columns is-flex is-flex-wrap-wrap">
    <div class="column is-12 is-12-mobile">
      <div class="carte-stat grph">
        <h3>Offres pourvues vs offres non pourvues</h3>
        <graphique-home-page></graphique-home-page>
      </div>
    </div>
    <div class="column is-3 is-6-mobile">

      <div class="carte-stat">
        <h3>Profils par catégorie</h3>
        <p class="extre">Excellence: {{ profilsParCategorie.excellence }}</p>
        <p class="extre">Premium: {{ profilsParCategorie.premium }}</p>
        <p class="extre">Privilège: {{ profilsParCategorie.privilege }}</p>
        <p class="extre">Elite: {{ profilsParCategorie.elite }}</p>
      </div>

    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Recherches de profil</h3>
        <p>{{ nombreRecherches }}</p>
      </div>
    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Mises en relation</h3>
        <p>{{ nombreMisesEnRelation }}</p>
      </div>
    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Offres publiées</h3>
        <p>{{ nombreOffresPubliees }}</p>
      </div>
    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Total candidatures</h3>
        <p>{{ nombreTotalCandidatures }}</p>
      </div>
    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Candidats retenus</h3>
        <p>{{ nombreCandidatsRetenus }}</p>
      </div>
    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Postes pourvus</h3>

        <p>{{ statsPostes.pourvus.nombre }}</p>
        <span>{{ statsPostes.pourvus.pourcentage }}</span>
      </div>
    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Postes non pourvus</h3>

        <p>{{ statsPostes.nonPourvus.nombre }}</p>
        <span>{{ statsPostes.nonPourvus.pourcentage }}</span>
      </div>
    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Annonces diffusées</h3>
        <p>{{ nombreAnnoncesDiffusees }}</p>
      </div>
    </div>

    <div class="column is-3 is-6-mobile">
      <div class="carte-stat">
        <h3>Vidéos visualisées</h3>
        <p>{{ nombreVideosVisualisees }}</p>
      </div>
    </div>



    <div class="column is-6 is-12-mobile" style="min-height: 400px">
      <div class="carte-stat tauxApprentissage">
        <h3>Taux d'apprentissage</h3>
        <tauxApprentissage :recruteurId="recruteurId" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

import { useEmploisJson } from "@/composables/useEmplois";
import { useRecruteursJson } from "@/composables/useRecruteurs";
import { useCandidatsJson } from "@/composables/useCandidats";
const { data: recruteurs } = useRecruteursJson();
const { data: emplois } = useEmploisJson();
const { data: candidats } = useCandidatsJson();
const recruteurId = useCookie("recruteurId");
const filteredJobs = computed(() => {
  if (!recruteurId.value) {
    // console.log("No recruteurId, returning empty array");
    return [];
  }
  const filtered = emplois.value.filter(
    (job) => job.id_recruteur === recruteurId.value
  );
  return filtered;
});

const totalCandidatures = computed(() => {
  return filteredJobs.value.reduce((total, job) => {
    return total + (job.candidatures ? job.candidatures.length : 0);
  }, 0);
});
const moyenneEvolutionCandidatures = computed(() => {
  const sum = filteredJobs.value.reduce(
    (total, job) => total + parseFloat(job.evolutionCandidatures),
    0
  );
  return filteredJobs.value.length
    ? (sum / filteredJobs.value.length).toFixed(2) + "%"
    : "0%";
});
//total des vues
const totalVues = computed(() => {
  return filteredJobs.value.reduce((total, job) => total + job.nbvues, 0);
});

const moyenneVues = computed(() => {
  return filteredJobs.value.length
    ? (totalVues.value / filteredJobs.value.length).toFixed(2)
    : 0;
});
const moyenneVuesEnPourcentage = computed(() => {
  const totalVues = filteredJobs.value.reduce(
    (total, job) => total + job.vueDesOffres,
    0
  );
  const moyenne = filteredJobs.value.length
    ? totalVues / filteredJobs.value.length
    : 0;
  return (moyenne * 100).toFixed(2) + "%";
});
const moyenneVuesOffres = computed(() => {
  const totalVues = filteredJobs.value.reduce(
    (total, job) => total + job.vueDesOffres,
    0
  );
  return filteredJobs.value.length
    ? (totalVues / filteredJobs.value.length).toFixed(2) + "%"
    : "0";
});

//pourcetage des emplois pourvus et vice cersa
const statsPostes = computed(() => {
  const total = filteredJobs.value.length;
  const pourvus = filteredJobs.value.filter((job) => job.pourvu).length;
  const nonPourvus = total - pourvus;
  return {
    pourvus: {
      nombre: pourvus,
      pourcentage: total ? (pourvus / total) * 100 + "%" : "0%",
    },
    nonPourvus: {
      nombre: nonPourvus,
      pourcentage: total ? (nonPourvus / total) * 100 + "%" : "0%",
    },
  };
});

//candidats adéquats
const highAdequacyCandidates = computed(() => {
  if (!filteredJobs.value || !candidats.value) return [];

  return filteredJobs.value
    .flatMap((job) => {
      if (!job.candidatures) return [];

      return job.candidatures
        .filter((candidature) => candidature && candidature.adequation > 90)
        .map((candidature) => {
          const candidate = candidats.value.find(
            (c) => c && c.candidat_id === candidature.candidat_id
          );
          return candidate
            ? {
              nom: candidate.nom,
              prenom: candidate.prenom,
              offreEmploi: job.titre,
              adequation: candidature.adequation,
            }
            : null;
        })
        .filter(Boolean);
    })
    .sort((a, b) => b.adequation - a.adequation)
    .slice(0, 5);
});

//top 5 offres d'emploi
const topViewedJobs = computed(() => {
  return filteredJobs.value.sort((a, b) => b.nbvues - a.nbvues).slice(0, 5);
});

//profil par categorie
const profilsParCategorie = computed(() => {
  const profils = {
    excellence: 0,
    premium: 0,
    privilege: 0,
    elite: 0
  };

  candidats.value.forEach(candidat => {
    const typeProfil = candidat.typedeProfil.toLowerCase();
    if (profils.hasOwnProperty(typeProfil)) {
      profils[typeProfil]++;
    }
  });

  return profils;
});


const nombreRecherches = computed(() => {
  const searchQueryCookie = useCookie('recentSearches');
  if (!searchQueryCookie.value) return 0;

  try {
    const searchQueries = searchQueryCookie.value;
    return Array.isArray(searchQueries) ? searchQueries.length : 0;
  } catch (error) {
    console.error('Erreur lors du comptage des éléments dans rawValue:', error);
    return 0;
  }

});

const nombreMisesEnRelation = computed(() => {
  // Cette valeur devrait être stockée et mise à jour dans la base de données
  return 75; // Exemple de valeur
});

const nombreOffresPubliees = computed(() => {
  return emplois.value.length;
});

const nombreTotalCandidatures = computed(() => {
  return emplois.value.reduce((total, emploi) => total + (emploi.candidatures ? emploi.candidatures.length : 0), 0);
});

const nombreCandidatsRetenus = computed(() => {
  return emplois.value.reduce((total, emploi) => {
    return total + (emploi.candidatures ? emploi.candidatures.filter(c => c.estretenu).length : 0);
  }, 0);
});

const nombrePostesPourvus = computed(() => {
  return emplois.value.filter(emploi => emploi.pourvu).length;
});

const nombrePostesNonPourvus = computed(() => {
  return emplois.value.filter(emploi => !emploi.pourvu).length;
});

// Ces valeurs devraient être stockées et mises à jour dans la base de données
const nombreAnnoncesDiffusees = ref(50);
const nombreVideosVisualisees = ref(200);


</script>


<style lang="scss" scoped>
.is-4 {
  .carte-stat {
    min-height: 340px;
  }
}

.carte-stat {
  border-radius: 6px;
  border: solid 2px #eceef6;
  background-color: #fff;
  padding: 1em;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  table {
    background: white !important;
  }

  th {
    font-family: "Inter", sans-serif !important;
    font-size: 12px !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    font-style: normal !important;
    line-height: normal !important;
    text-align: left !important;
    color: #949494 !important;
    border: none !important;
    padding: 0.5em !important;
  }

  td {
    font-family: "Inter", sans-serif !important;
    font-size: 14px !important;
    font-weight: bold !important;
    font-stretch: normal !important;
    font-style: normal !important;
    line-height: normal !important;
    letter-spacing: normal !important;
    text-align: left !important;
    color: #000 !important;
    padding: 0.5em !important;
    border: none !important;
  }

  h3 {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.16px;
    text-align: left;
    color: #343434;
    margin-bottom: 10px;
  }

  h3 {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.16px;
    text-align: left;
    color: #343434;
    margin-bottom: 10px;
  }

  .extre {
    font-size: 16px !important;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 28px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.28px;
    text-align: left;
    color: #232323;
  }

  span {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.14px;
    text-align: left;
    color: #0b8a00;
    position: absolute;
    top: 10px;
    right: 10px;
    gap: 3px;
    padding: 3px 4px;
    border-radius: 50px;
    background-color: rgba(35, 193, 10, 0.15);
  }
}

.crack {
  th {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    text-align: left;
    color: #949494;
    padding: 0.5em;
  }

  a {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    padding: 0.5em;

    span {
      position: relative;
      color: #16c098;
      background: none !important;
      top: 0;
      left: 0;
    }
  }
}
</style>
