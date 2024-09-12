<template>
  <div class="candidatÒ">
    <div class="columns">
      <div class="column is-10-desktop is-12-mobile">
        <div class="candidat-info">
          <div class="theez is-flex">
            <div class="onez">
              <img :src="candidat.image" :alt="candidat.nom" />
            </div>
            <div class="twoz">
              <h3>{{ candidat.nom }} {{ candidat.prenom }}</h3>
              <p class="titre">{{ candidat.titre }}</p>
              <div class="nfo">
                <p>Expérience: {{ candidat.experience }} ans</p>

                <p>Email: {{ candidat.email }}</p>
                <p>Téléphone: {{ candidat.telephone }}</p>
                <p>Date d'inscription: {{ candidat.dateInscription }}</p>
                <p>Géolocalisation: {{ candidat.geolocalisation }}</p>
              </div>
            </div>
          </div>
          <div class="skills-container">
            <span v-for="(point, index) in candidat.points_forts" :key="index" class="skill-button">
              {{ point }}
            </span>
          </div>
          <div class="points-forts">
            <h4>Points forts</h4>
            <p>{{ candidat.appreciation }}</p>
          </div>
        </div>

        <div class="competences">
          <!-- <h4>Compétences</h4> -->
          <div class="skills-container">
            <span v-for="(competence, index) in candidat.competences" :key="index" class="skill-button">
              {{ competence }}
            </span>
          </div>
        </div>
      </div>
      <div class="column is-2-desktop is-12-mobile madjoua">
        <p :class="['levraimatch', matchColorClass]">
          Match à {{ adequation }} %
        </p>

        <button @click="showPopup = true" class="andrewtateisanidiot">
          Programmer les interviews
        </button>
      </div>
    </div>
  </div>

  <teleport to="body">
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <button class="todd" @click="showPopup = false">
          <span class="material-icons">close</span>
        </button>

        <div class="columns infordetaillecandidat">
          <div class="macine column is-6-desktop is-12-mobile is-flex">
            <div class="ligne1cv columns is-12 coleen">
              <div class="trunks is-flex is-flex-direction-row column is-9-desktop is-12-mobile">
                <img :src="candidat.image" alt="" />
                <div class="neay is-flex is-flex-direction-column">
                  <h2>{{ candidat.nom }} {{ candidat.prenom }}</h2>
                  <p v-if="adequation > 80" class="candidat-parfait">
                    Candidat parfait
                  </p>
                  <p>
                    <span class="material-icons">person</span>{{ candidat.titre }}
                  </p>
                  <p class="localisation">
                    <span class="material-icons">location_on</span>
                    {{ candidat.geolocalisation }}
                  </p>
                  <p class="telephone">
                    <a :href="'tel:' + candidat.telephone"></a>
                    <span class="material-icons">phone</span>{{ candidat.telephone }}
                  </p>
                  <p class="email">
                    <a :href="'mailto:' + candidat.email" target="_blank">
                      <span class="material-icons">email</span>
                      {{ candidat.email }}
                    </a>
                  </p>
                </div>
              </div>
              <div class="vegeta is-flex is-flex-direction-row column is-3-desktop is-12-mobile">
                <div :class="['match', matchColorClass]">
                  <span class="brad"> {{ adequation }}%</span>
                  <p>d'adéquation par rapport au poste</p>
                </div>
              </div>
            </div>

            <div class="ligne2cv is-12 coleen">
              <p>Taux de remplissage du profil professionnel</p>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{
                  width: candidat.taux_remplissage_profil + '%',
                  transition: 'width 1s ease-out',
                  transformOrigin: 'left',
                }"></div>
                <span class="progress-text" :style="{
                  position: 'absolute',
                  left: candidat.taux_remplissage_profil + '%',
                  top: 0,
                  bottom: 0,
                  transform: 'translateX(-50%)',
                  transition: 'left 1s ease-out',
                }">
                  {{ candidat.taux_remplissage_profil }}%
                </span>
              </div>
            </div>

            <div class="ligne3cv">
              <div class="correspondant trap">
                <img src="/images/checked-success-svgrepo-com.svg" alt="" />
                <div class="kemiss ccp">
                  <span class="quan">Correspondant au poste</span>
                  <span class="morez">{{ candidatInfo.correspondant }}</span>
                </div>
              </div>
              <div class="necorrespondantpas trap">
                <img src="/images/checked-success-alt-svgrepo-com.svg" alt="" />
                <div class="kemiss ncp">
                  <span class="buan">Ne correspondant au poste</span>
                  <span class="morez">{{
                    candidatInfo.necorrespondantpas
                    }}</span>
                </div>
              </div>
            </div>

            <div class="ligne4cv">
              <div class="lacie">
                <h3>Compétences :</h3>
                <ul>
                  <li v-for="(competence, index) in candidat.competences" :key="index">
                    {{ competence
                    }}{{ index !== candidat.competences.length - 1 ? "," : "" }}
                  </li>
                </ul>
              </div>
              <div class="lacie">
                <h3>Diplômes :</h3>
                <ul>
                  <li v-for="(diplome, index) in candidat.education" :key="index">
                    {{ diplome
                    }}{{ index !== candidat.education.length - 1 ? "," : "" }}
                  </li>
                </ul>
              </div>
              <div class="lacie">
                <h3>Expérience professionnelle :</h3>
                <p>{{ candidat.experience }} ans</p>
              </div>
              <div class="documentsducandidat">
                <div class="h4">Documents</div>
                <div class="wrapperdoc">
                  <a :href="candidat.cv" target="_blank" class="document-button">
                    <button>CV</button>
                  </a>
                  <a :href="candidat.lettre_motivation" target="_blank" class="document-button">
                    <button>Lettre de motivation</button>
                  </a>
                  <a :href="candidat.portfolio" target="_blank" class="document-button">
                    <button>Portfolio</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="interviewdecision column is-6-desktop is-12-mobile">
            <ul class="tabs">
              <li @click="activeTab = 'interview'" :class="{ active: activeTab === 'interview' }">
                Interview
              </li>
              <li @click="activeTab = 'decision'" :class="{ active: activeTab === 'decision' }">
                Décision
              </li>
            </ul>

            <div class="peyton" id="interview" v-if="activeTab === 'interview'">
              <h3>Interviews</h3>
              <div class="interview-list">
                <ul>
                  <li class="major" v-for="(interview, index) in candidatInfo.interviews">
                    <p class="raison">{{ interview.raison }}</p>
                    <p class="date">
                      {{ interview.date }} - {{ interview.heure }}
                    </p>
                    <p class="date" v-if="interview.lien">
                      meet link
                      <a :href="interview.lien">{{ interview.lien }}</a>
                    </p>
                    <hr />
                  </li>
                </ul>
              </div>

              <div class="add-interview-section">
                <a @click="toggleAddInterviewForm" class="add-interview-link">
                  {{
                    showAddInterviewForm ? "Annuler" : "Ajouter une interview"
                  }}
                </a>

                <div v-if="showAddInterviewForm" class="add-interview-form">
                  <form @submit.prevent="submitInterview">
                    <div class="field">
                      <label class="label">Date</label>
                      <div class="control">
                        <input v-model="newInterview.date" type="date" class="input" required />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Heure</label>
                      <div class="control">
                        <input v-model="newInterview.heure" type="time" class="input" required />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Raison</label>
                      <div class="control">
                        <input v-model="newInterview.raison" type="text" class="input" required />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Lien</label>
                      <div class="control">
                        <input v-model="newInterview.lien" type="url" class="input" required />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <button type="submit" class="button is-primary">
                          Ajouter l'interview
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="peyton" id="decision" v-if="activeTab === 'decision'">
              <div class="hiring-decision">
                <h3>Décision d'embauche</h3>
                <label>
                  <input type="radio" v-model="hiringStatus" value="embauche"> Embauché
                </label>
                <label>
                  <input type="radio" v-model="hiringStatus" value="non embauché"> Non embauché
                </label>
              </div>

              <h3>Décision</h3>
              <form @submit.prevent="submitDecision" v-if="isDecisionEnabled">
                <div class="field">
                  <label class="label">Décision</label>
                  <div class="control">
                    <textarea v-model="newDecision" class="textarea" required></textarea>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button type="submit" class="button is-primary">
                      Envoyer la décision
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import { useEmploisJson } from "@/composables/useEmplois";
const props = defineProps({
  candidat: Object,
  adequation: {
    type: Number,
    required: true,
  },
  emploiId: Number,
});
const { updateEmploiStatusDansLaListe } = useEmploisJson();
const newInterview = ref({
  date: "",
  heure: "",
  raison: "",
  lien: "",
});

const submitInterview = async () => {
  try {
    const response = await fetch("/api/interview/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emploiId: props.emploiId,
        candidatId: props.candidat.candidat_id,
        ...newInterview.value,
      }),
    });
    const result = await response.json();
    if (result.success) {
      updateEmploiStatusDansLaListe(result.emploi);
      newInterview.value = { date: "", heure: "", raison: "", lien: "" };
      alert("Interview ajoutée avec succès");
    } else {
      alert(result.message || "Erreur lors de l'ajout de l'interview");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'interview:", error);
    alert("Erreur lors de l'ajout de l'interview");
  }
};
const newDecision = ref("");
const hiringStatus = ref(null);
const isDecisionEnabled = computed(() => hiringStatus.value !== null);

const submitDecision = async () => {
  try {
    const response = await fetch("/api/decision/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emploiId: props.emploiId,
        candidatId: props.candidat.candidat_id,
        decision: newDecision.value,
        estembauche: hiringStatus.value === 'embauche'
      })
    });
    const result = await response.json();
    if (result.success) {
      alert("Décision envoyée avec succès");
      newDecision.value = "";
      hiringStatus.value = null;
    } else {
      alert("Erreur lors de l'envoi de la décision: " + result.message);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de la décision:", error);
    alert("Erreur lors de l'envoi de la décision");
  }
};


const showPopup = ref(false);
const activeTab = ref("interview");
const showAddInterviewForm = ref(false);

const toggleAddInterviewForm = () => {
  showAddInterviewForm.value = !showAddInterviewForm.value;
};

const { data: emplois } = useEmploisJson();
const candidatInfo = computed(() => {
  const emploi = emplois.value.find((e) => e.id === props.emploiId);
  if (emploi) {
    const candidature = emploi.candidatures.find(
      (c) => c.candidat_id === props.candidat.candidat_id
    );
    if (candidature) {
      return {
        correspondant: candidature.correspondant,
        necorrespondantpas: candidature.necorrespondantpas,
        interviews: candidature.interviews || [],
        decision: candidature.decision,
      };
    }
  }
  return null;
});
const closePopup = () => {
  showPopup.value = false;
};
const matchColorClass = computed(() => {
  if (props.adequation >= 80) return "match-green";
  if (props.adequation >= 60) return "match-orange";
  return "match-red";
});
</script>

<style lang="scss" scoped>
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
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 5px;
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.candidat {
  /* Styles pour le conteneur du candidat */
}

.candidat-info {
  /* Styles pour les informations du candidat */
}

.andrewtateisanidiot {
  justify-content: flex-end;
  font-size: 25px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: right;
  color: #012e61;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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

.hiring-decision {
  label {
    list-style: none;
    box-sizing: inherit;
    margin: 0;
    font-size: 15.2px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #18191c;
    padding: 0.45em 0;
  }
}
</style>
