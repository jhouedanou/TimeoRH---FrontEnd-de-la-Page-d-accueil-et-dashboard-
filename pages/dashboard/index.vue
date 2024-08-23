<template>
  <div class="columns is-flex is-flex-wrap-wrap">
    <div class="column is-3">
      <div class="carte-stat candidatures">
        <h3>Candidatures</h3>
        <p>{{ totalCandidatures }}</p>
        <span>{{ moyenneEvolutionCandidatures }}</span>
      </div>
    </div>
    <div class="column is-3">
      <div class="carte-stat vuedesoffres">
        <h3>Total des vues</h3>
        <p>{{ totalVues }}</p>
        <span>{{ moyenneVuesOffres }}</span>
      </div>
    </div>
    <div class="column is-3">
      <div class="carte-stat">
        <h3>Postes pourvus</h3>
        <p>{{ statsPostes.pourvus.nombre }}</p>
        <span>{{ statsPostes.nonPourvus.pourcentage }}</span>
      </div>
    </div>
    <div class="column is-3">
      <div class="carte-stat">
        <h3>Postes non pourvus</h3>
        <p>{{ statsPostes.nonPourvus.nombre }}</p>
        <span>{{ statsPostes.nonPourvus.pourcentage }}</span>
      </div>
    </div>
    <div class="column is-12">
      <div class="carte-stat grph">
        <h3>Vues vs Candidatures</h3>
        <graphique-home-page></graphique-home-page>
      </div>
    </div>
    <div class="column is-4" style="min-height: 400px">
      <div class="carte-stat">
        <h3>Candidatures intéressantes</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Offre d'emploi</th>
              <th>Taux</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="candidate in highAdequacyCandidates"
              :key="`${candidate.nom}-${candidate.prenom}-${candidate.offreEmploi}`"
            >
              <td>{{ candidate.nom }}</td>
              <td>{{ candidate.prenom }}</td>
              <td>{{ candidate.offreEmploi }}</td>
              <td>{{ candidate.adequation }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="column is-4" style="min-height: 400px">
      <div class="carte-stat crack">
        <h3>Offres d’emploi les plus consultées</h3>
        <ul>
          <li v-for="job in topViewedJobs" :key="job.id">
            <NuxtLink :to="``">
              {{ job.titre }} <br />
              <span>{{ job.nbvues }} vues</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="column is-4" style="min-height: 400px">
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
  td {
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
