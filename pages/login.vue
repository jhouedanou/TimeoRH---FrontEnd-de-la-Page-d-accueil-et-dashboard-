<template>
  <div id="loginwrapper">
    <div id="login">
      <div class="login-container">
        <form @submit.prevent="login" class="login-form">
          <NuxtLink to="/">
            <nuxt-img
              class="loginlogin"
              src="/images/logosearch.svg"
              format="webp"
              quality="80"
              fallback="/images/logosearch.svg"
              alt="Description de l'image"
            />
          </NuxtLink>
          <div class="form-field">
            <label for="email">Adresse e-mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="Entrez votre adresse e-mail"
            />
          </div>
          <div class="form-field password-field">
            <label for="password">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Entrez votre mot de passe"
            />
            <button id="quc" type="button" @click.prevent="forgotPassword">
              Mot de passe oublié
            </button>
          </div>
          <div class="form-fieldz">
            <button
              type="button"
              @click="togglePassword"
              class="toggle-password"
            >
              <span class="material-icons">
                {{ showPassword ? "visibility_off" : "visibility" }}
              </span>
            </button>
          </div>
          <div class="form-fieldz">
            <button id="rez" type="submit">Se connecter</button>
          </div>
          <div class="form-fieldz lelv">
            <input id="remember" v-model="rememberMe" type="checkbox" />
            <label for="remember">Se souvenir de moi</label>
          </div>
        </form>
        <button class="Rectangle-152" @click="showPopup = true">
          Créer un compte
        </button>
      </div>
      <teleport to="body">
        <div v-if="showPopup" class="popup-overlay">
          <div class="popup-content recruteur-popup">
            <h2>Créer un compte</h2>
            <form @submit.prevent="submitForm">
              <div class="form-field">
                <label for="popup-email">Adresse e-mail</label>
                <input
                  id="popup-email"
                  v-model="popupEmail"
                  type="email"
                  required
                  placeholder="Entrez votre adresse e-mail"
                />
              </div>
              <div class="form-field">
                <label for="popup-name">Nom</label>
                <input
                  id="popup-name"
                  v-model="popupName"
                  type="text"
                  required
                  placeholder="Entrez votre nom"
                />
              </div>
              <div class="form-field">
                <label for="popup-organization">Organisme</label>
                <input
                  id="popup-organization"
                  v-model="popupOrganization"
                  type="text"
                  required
                  placeholder="Entrez le nom de votre organisme"
                />
              </div>
              <div class="alert alert-warning">
                Nous traiterons votre demande dans les plus brefs délais.
              </div>
              <button
                type="submit"
                class="submit-button"
                @click="envoiDonnees()"
              >
                Envoyer la demande
              </button>
            </form>
            <button
              id="closthatsh"
              @click="showPopup = false"
              class="close-button"
            >
              Fermer
            </button>
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useRecruteursJson } from "@/composables/useRecruteurs";
const { data: recruteurs } = useRecruteursJson();
import { MD5 } from "crypto-js";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loginAttempts = ref(0);
const router = useRouter();
const showPassword = ref(false);
const isPopupVisible = ref(false);
const showPopup = ref(false);
//pour l'envoi des données
const popupEmail = ref("");
const popupName = ref("");
const popupOrganization = ref("");

const hidePopup = () => {
  isPopupVisible.value = false;
};
onMounted(() => {
  const savedEmail = Cookies.get("userEmail");
  const savedPassword = Cookies.get("userPassword");
  if (savedEmail && savedPassword) {
    email.value = savedEmail;
    password.value = atob(savedPassword);
    rememberMe.value = true;
  }
});

const validateLoginForm = () => {
  if (!email.value || !password.value) {
    alert("Veuillez remplir tous les champs");
    return false;
  }
  return true;
};
const validatePopupForm = () => {
  if (!popupEmail.value || !popupName.value || !popupOrganization.value) {
    alert("Veuillez remplir tous les champs");
    return false;
  }
  if (!popupEmail.value.includes("@")) {
    alert("Veuillez entrer une adresse e-mail valide");
    return false;
  }
  return true;
};

//message à moi même : semblant de logique de connexion, a remplacer par une méthode plus robuste, svp. mot de passe encrypté avec md5;
//JeanDpt123
const login = () => {
  // console.log("Email entré:", email.value);
  // console.log("Mot de passe entré:", password.value);

  const hashedPassword = MD5(password.value).toString();
  // console.log("Mot de passe haché:", hashedPassword);

  // console.log("Recruteurs:", recruteurs.value.recruteurs);

  const user = recruteurs.value.recruteurs.find(
    (u) => u.email === email.value && u.motdepasse === hashedPassword
  );

  // console.log("Utilisateur trouvé:", user);

  if (user) {
    // Authentification réussie
    console.log("Authentification réussie");
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/dashboard");
    //Enregistrement de l'utilisateur dans le localStorage
    Cookies.set("user_authenticated", "true", { expires: 1 }); // expire après 1 jour
    // Enregistrement des informations de connexion dans les cookies
    if (rememberMe.value) {
      Cookies.set("userEmail", email.value, { expires: 365 });
      Cookies.set("userPassword", btoa(password.value), { expires: 365 });
    } else {
      Cookies.remove("userEmail");
      Cookies.remove("userPassword");
    }
  } else {
    console.log("Authentification échouée");
    alert("Identifiants incorrects");
  }
};

const forgotPassword = () => {
  window.location.href = `mailto:support@example.com?subject=Réinitialisation de mot de passe&body=Veuillez réinitialiser mon mot de passe pour l'email : ${email.value}`;
};
const envoiDonnees = () => {
  const subject = encodeURIComponent("Nouvelle demande de compte");
  const body = encodeURIComponent(
    `Email: ${popupEmail.value}\nNom: ${popupName.value}\nOrganisme: ${popupOrganization.value}`
  );

  window.location.href = `mailto:support@example.com?subject=${subject}&body=${body}`;

  showPopup.value = false; // Ferme la popup après l'envoi
};
</script>

<style lang="scss" scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  position: relative;
}

label {
}

input:focus {
  outline: none;
  border-color: #1976d2;
}

input:focus + label {
  color: #1976d2;
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

// Variables
$blue-900: #1e3a8a;
$blue-800: #1e40af;
$yellow-100: #fef9c3;
$yellow-500: #eab308;
$yellow-700: #a16207;
$gray-300: #d1d5db;
$gray-700: #374151;
$white: #ffffff;

.popup-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba($blue-900, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
#closthatsh {
  width: 80%;
  height: 38px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0em auto 2em auto;
  padding: 7px 65px;
  border-radius: 5px;
  background-color: #012e61;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.06px;
  text-align: left;
  color: #fafafa;

  filter: alpha(opacity=50); /* internet explorer */
  -khtml-opacity: 0.5; /* khtml, old safari */
  -moz-opacity: 0.5; /* mozilla, netscape */
  opacity: 0.5; /* fx, safari, opera */

  -webkit-transition: all 0.4s ease-in-out 0.2s;
  -moz-transition: all 0.4s ease-in-out 0.2s;
  -o-transition: all 0.4s ease-in-out 0.2s;
  -ms-transition: all 0.4s ease-in-out 0.2s;
  transition: all 0.4s ease-in-out 0.2s;
  &:hover {
    filter: alpha(opacity=100); /* internet explorer */
    -khtml-opacity: 1; /* khtml, old safari */
    -moz-opacity: 1; /* mozilla, netscape */
    opacity: 1; /* fx, safari, opera */

    -webkit-transition: all 0.4s ease-in-out 0.2s;
    -moz-transition: all 0.4s ease-in-out 0.2s;
    -o-transition: all 0.4s ease-in-out 0.2s;
    -ms-transition: all 0.4s ease-in-out 0.2s;
    transition: all 0.4s ease-in-out 0.2s;
  }
}
.recruteur-popup {
  width: 415px;
  height: auto;
  margin: 35px 0 0;
  padding: 0;
  border-radius: 8px;
  background-color: #fff;
  .submit-button {
    width: 100%;
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 2em auto;
    padding: 7px 65px;
    border-radius: 5px;
    background-color: #012e61;
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.06px;
    text-align: left;
    color: #fafafa;
  }
  .alert {
    width: 349px;
    height: 64px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background-color: #ffde7f;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }
  form {
    padding: 2em;
    label {
      font-family: "Open Sans", sans-serif;
      font-size: 20px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.06px;
      text-align: left;
      color: #1e1e1e;
      width: 100%;
      clear: both;
      display: block;
    }
    input {
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      margin: 5px 0 0;
      padding: 10px 15px;
      border-radius: 10px;
      border: solid 1px #e7e6e6;
      background-color: #fafafa;
      width: 100%;
      clear: both;
      display: block;
      width: 349px;
      height: 50px;
      flex-grow: 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #aba3a9;
      margin-bottom: 30px;
      &:focus {
        border-color: #1976d2;
        outline: none;
        color: black;
      }
    }
  }
  h2 {
    background-color: #012e61;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: bold;
    padding: 0.4rem;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fafafa;
  }
  .popup-content {
    background-color: $white;
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 28rem;
    width: 100%;

    .popup-body {
      padding: 1.5rem;

      h2 {
        font-size: 1.25rem;
        font-weight: 700;
        color: $blue-900;
        margin-bottom: 1rem;
      }

      form {
        .form-group {
          margin-bottom: 1rem;

          label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: $gray-700;
            margin-bottom: 0.25rem;
          }

          input {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border: 1px solid $gray-300;
            border-radius: 0.375rem;
            font-size: 1rem;

            &::placeholder {
              color: $gray-300;
            }
          }
        }

        .alert {
          background-color: $yellow-100;
          border-left: 4px solid $yellow-500;
          color: $yellow-700;
          padding: 1rem;
          margin-bottom: 1rem;

          p {
            font-size: 0.875rem;
          }
        }

        button {
          width: 100%;
          background-color: $blue-900;
          color: $white;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: $blue-800;
          }
        }
      }
    }
  }
}
</style>
