<template>
  <div class="main-content">
    <h1>Ajouter une nouvelle offre d'emploi</h1>
    <div class="columns">
      <div id="oneside" class="column is-8-desktop is-12-mobile">
        <div class="is-full" v-if="step === 1">
          <h2>Etape 1/3 : Décrire l'offre d'emploi</h2>
          <div class="form-group">
            <label for="job-title"
              >Quel est la meilleure dénomination pour cet emploi ?</label
            >
            <input type="text" id="job-title" v-model="formData.titre" />
          </div>
          <div class="form-group">
            <label for="job-description">Description</label>
            <textarea
              id="job-description"
              v-model="formData.description"
            ></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="job-level">Niveau de poste</label>
              <select id="job-level" v-model="formData.niveauPoste">
                <option value="Bac+4">Bac+4</option>
                <!-- Add other options -->
              </select>
            </div>
            <div class="form-group">
              <label for="contract-type">Type de contrat</label>
              <select id="contract-type" v-model="formData.typeContrat">
                <option value="CDD">CDD</option>
                <!-- Add other options -->
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="company">Entreprise</label>
              <input type="text" id="company" v-model="formData.entreprise" />
            </div>
            <div class="form-group">
              <label for="company-type">Type d'entreprise</label>
              <input
                type="text"
                id="company-type"
                v-model="formData.typeEntreprise"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="country">Pays de l'entreprise</label>
              <input
                type="text"
                id="country"
                v-model="formData.paysEntreprise"
              />
            </div>
            <div class="form-group">
              <label for="city">Ville de l'entreprise</label>
              <input type="text" id="city" v-model="formData.villeEntreprise" />
            </div>
          </div>
          <div class="button-group">
            <!-- <button @click="saveAndContinue">Enregistrer</button> -->
            <button @click="nextStep">Etape 2/3 : Compétences</button>
          </div>
        </div>

        <div class="is-full" v-else-if="step === 2">
          <h2>Etape 2/3 : Choix des compétences</h2>
          <!-- Compétences de base -->
          <div class="form-group">
            <label
              >Quelles sont les compétences de base requises pour ce poste
              ?</label
            >
            <input type="text" v-model="formData.competencesBase" />
            <div class="skills-container">
              <button
                v-for="skill in basicSkills"
                :key="skill.id"
                @click="addSkill(skill, 'base')"
                class="skill-button"
              >
                + {{ skill.name }}
              </button>
            </div>
          </div>

          <!-- Compétences avancées -->
          <div class="form-group">
            <label>Quelles sont les compétences requises pour ce poste ?</label>
            <input type="text" v-model="formData.competencesRequises" />
            <div class="skills-container">
              <button
                v-for="skill in advancedSkills"
                :key="skill.id"
                @click="addSkill(skill, 'required')"
                class="skill-button"
              >
                + {{ skill.name }}
              </button>
            </div>
          </div>

          <div class="button-group">
            <button @click="prevStep">Précédent</button>
            <button @click="nextStep">
              Etape 3/3 : Expérience et diplômes
            </button>
          </div>
        </div>

        <div class="is-full" v-else-if="step === 3">
          <h2>Etape 3/3 : Expériences et diplômes</h2>
          <div class="form-group">
            <label for="min-experience"
              >Quelle est l'expérience de travail minimale requise pour ce poste
              ?</label
            >
            <input
              type="number"
              id="min-experience"
              v-model.number="formData.experienceRequise"
            />
          </div>
          <div class="form-group">
            <label for="required-diploma"
              >Quels sont les diplômes requis pour ce poste ?</label
            >
            <input
              type="text"
              id="required-diploma"
              v-model="formData.diplomeRequis"
            />
          </div>
          <div class="form-group">
            <label for="profile-description"
              >Décrire le profil recherché pour ce poste</label
            >
            <textarea
              id="profile-description"
              v-model="formData.profilRecherche"
            ></textarea>
          </div>
          <div class="button-group">
            <button @click="prevStep">Précédent</button>
            <button @click="submit">Publier</button>
          </div>
        </div>
      </div>
      <div id="twoside" class="is-4-desktop is-12-mobile">
        <div class="preview-panel">
          <h3>Aperçu</h3>
          <div class="preview-content">
            <div class="premierecarte">
              <h2>{{ formData.titre || "Titre du poste" }}</h2>
              <p>{{ formData.description || "Description du poste" }}</p>
              <p>
                {{
                  `${formData.paysEntreprise ?? ""}, ${
                    formData.villeEntreprise ?? ""
                  }` || "Localisation"
                }}
              </p>
              <p>{{ formData.niveauPoste || "Niveau de poste" }}</p>
              <p>
                {{
                  formData.experienceRequise
                    ? `${formData.experienceRequise} ans d'expérience`
                    : "Expérience requise"
                }}
              </p>
            </div>

            <div class="secondecarte">
              <h3>Détails du poste</h3>
              <p>
                <strong>Entreprise:</strong>
                {{ formData.entreprise || "Nom de l'entreprise" }}
              </p>
              <p>
                <strong>Type de contrat:</strong>
                {{ formData.typeContrat || "Type de contrat" }}
              </p>
              <h3>Compétences</h3>
              <p>
                <strong>Compétences de base:</strong><br />
                {{
                  formData.competencesBase ||
                  "Aucune compétence de base spécifiée"
                }}
              </p>
              <p>
                <strong>Compétences requises:</strong><br />
                {{
                  formData.competencesRequises ||
                  "Aucune compétence requise spécifiée"
                }}
              </p>
              <p>
                <strong>Profil recherché:</strong>
                {{ formData.profilRecherche || "Profil recherché" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSuccessPopup" class="success-popup">
      <div class="popup-content">
        <h3>Succès!</h3>
        <p>L'offre d'emploi a été ajoutée avec succès.</p>
        <button @click="resetForm">Ajouter une nouvelle offre</button>
        <button @click="goToDashboard">Retour au tableau de bord</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useEmploisJson } from "@/composables/useEmplois";
import { useSkills } from "@/composables/useSkills";
import { useCookie } from "#app";
import Cookies from "js-cookie";
definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});
const showSuccessPopup = ref(false);

const formDataCookie = useCookie("formData", {
  maxAge: 3600, // durée de vie du cookie en secondes
  sameSite: "strict",
});

const { data: emplois, saveNewEmploi } = useEmploisJson();

const { basicSkills, advancedSkills } = useSkills();

const step = ref(1);
const formData = reactive({
  titre: "",
  description: "",
  niveauPoste: "",
  typeContrat: "",
  entreprise: "",
  typeEntreprise: "",
  paysEntreprise: "",
  villeEntreprise: "",
  competencesBase: "",
  competencesRequises: "",
  experienceRequise: "",
  diplomeRequis: "",
  profilRecherche: "",
});
const resetForm = () => {
  // Réinitialiser le formulaire et revenir au step 1
  Object.assign(formData, initialFormData);
  step.value = 1;
  showSuccessPopup.value = false;
};

const goToDashboard = () => {
  // Rediriger vers le tableau de bord
  navigateTo("/dashboard");
};

const nextStep = () => {
  if (step.value < 3) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const addSkill = (skill, type) => {
  if (type === "base") {
    if (!formData.competencesBase.includes(skill.name)) {
      formData.competencesBase +=
        (formData.competencesBase ? ", " : "") + skill.name;
    }
  } else {
    if (!formData.competencesRequises.includes(skill.name)) {
      formData.competencesRequises +=
        (formData.competencesRequises ? ", " : "") + skill.name;
    }
  }
};

const saveFormDataToCookie = () => {
  Cookies.set("formData", JSON.stringify(formData), { expires: 7 });
};

const loadFormDataFromCookie = () => {
  const savedData = Cookies.get("formData");
  if (savedData && typeof savedData === "string") {
    try {
      const parsedData = JSON.parse(savedData);
      Object.assign(formData, parsedData);
    } catch (error) {
      console.error("Error parsing cookie data:", error);
    }
  }
};

const submit = async () => {
  saveFormDataToCookie();
  try {
    const newEmploi = {
      ...formData,
      id: Date.now(),
      datePublication: new Date().toISOString().split("T")[0],
    };

    await saveNewEmploi(newEmploi);
    showSuccessPopup.value = true;
    // Do not reset the step here
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'offre d'emploi", error);
    // Gérer l'erreur
  }
};
watch(
  formData,
  (newValue) => {
    formDataCookie.value = JSON.stringify(newValue);
  },
  { deep: true }
);
watch(
  () => showSuccessPopup.value,
  (newValue) => {
    console.log("showSuccessPopup changed:", newValue);
  }
);
onMounted(() => {
  loadFormDataFromCookie();
});
</script>
<style lang="scss" scoped>
h1 {
  font-family: "Inter", sans-serif;
  font-size: 25px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #002160;
  display: block;
  height: 80px;
}
#oneside {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  .is-full {
    width: 100%;
  }
  h2 {
    font-family: "Inter", sans-serif;
    font-size: 25px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
  }
  label {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.9;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
  }
  input {
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    border: solid 1px #a4a4a4;
    width: 100%;
    padding: 1em;
    height: 53px;
  }
  .button-group {
    button {
      width: 293px;
      height: 56px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 32px;
      background-color: #012e61;
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
}
.skill-button {
  height: 42px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding: 1em;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
  background-color: #f3f3f3;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.5;
  letter-spacing: normal;
  text-align: center;
  color: #002160;
}
.main-content {
  padding: 2rem;
  background-color: #f8f9fa;
}

h2 {
  font-size: 1.2rem;
  color: #0056b3;
  margin-bottom: 1rem;
}

.columns {
  display: flex;
  flex-wrap: wrap;
}

#oneside {
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  padding-right: 1rem;
}

#twoside {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding-left: 1rem;
}

@media (max-width: 1023px) {
  #oneside,
  #twoside {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0;
  }
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #495057;
}

input[type="text"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;
}

textarea {
  min-height: 100px;
}

.form-row {
  display: flex;
  margin: 0 -0.5rem;
}

.form-row .form-group {
  flex: 1;
  padding: 0 0.5rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #0056b3;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #004494;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2.5rem;
}
.form-group {
  margin-top: 2.5rem;
}
.skill-button:hover {
  background-color: #dee2e6;
}
.preview-card {
  background-color: #f8f9fa; /* Couleur de fond */
  border: 1px solid #e0e0e0; /* Bordure légère */
  border-radius: 8px; /* Bords arrondis */
  padding: 16px; /* Espacement interne */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre légère */
  margin-bottom: 20px; /* Espacement sous la carte */
  font-family: Arial, sans-serif; /* Police de caractère */
}

.preview-card h2 {
  font-size: 18px; /* Taille du texte pour le titre */
  color: #003566; /* Couleur du texte */
  margin-bottom: 8px; /* Espacement sous le titre */
}

.preview-card p {
  font-size: 14px; /* Taille du texte pour la description */
  color: #6c757d; /* Couleur du texte */
  margin-bottom: 6px; /* Espacement sous chaque paragraphe */
}

.preview-card p:last-child {
  margin-bottom: 0; /* Pas d'espacement sous le dernier paragraphe */
}
.premierecarte {
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 4px 21px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
  h2 {
    font-size: 16px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #012e61;
  }
  p {
    font-size: 15px;
    line-height: 1.5;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    margin-bottom: 1em;
  }
}
.secondecarte {
  margin-top: 2em;
  padding: 1em;

  font-size: 15px;
  line-height: 1.5;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  p {
    margin-bottom: 1em;
  }
  strong {
    font-size: 15px;
    line-height: 1.5;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #012f61;
  }
}
.preview-panel {
  h3 {
    font-size: 25px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    margin-bottom: 1em;
  }
}

.success-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
