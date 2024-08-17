<template>
  <div id="loginwrapper">
    <div id="login">
      <div class="login-container">
        <form @submit.prevent="login" class="login-form">
          <nuxt-img
            class="loginlogin"
            src="/images/logosearch.svg"
            format="webp"
            quality="80"
            fallback="/images/logosearch.svg"
            alt="Description de l'image"
          />
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
            <input id="remember" v-model="rememberMe" type="checkbox" />
            <label for="remember">Se souvenir de moi</label>
          </div>
          <button type="submit">Se connecter</button>
          <button @click="forgotPassword">Mot de passe oublié</button>
        </form>
      </div>
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

const togglePassword = () => {
  showPassword.value = !showPassword.value;
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
</script>

<style lang="scss" scoped>
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

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
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
</style>
