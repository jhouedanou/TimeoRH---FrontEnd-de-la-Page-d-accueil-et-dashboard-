<template>
  <div>
    <button class="hamburger-menu" @click="toggleSidebar" v-show="isMobile">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <aside
      class="dashboard-sidebar p-0"
      :class="{ 'is-active': sidebarActive }"
    >
      <div class="recruiter-info p-2">
        <img
          :src="recruiterInfo.image"
          alt="Recruteur"
          height="52"
          width="52"
        />
        <p>
          {{ recruiterInfo.prenom }} {{ recruiterInfo.nom }}<br /><span
            >{{ recruiterInfo.poste }} à {{ recruiterInfo.compagnie }}</span
          >
        </p>
      </div>
      <nav>
        <ul class="dashboard-sidebar-menu">
          <li>
            <NuxtLink
              @click="closeSidebar"
              to="/dashboard"
              :class="{ active: $route.path === '/dashboard' }"
            >
              <img src="/images/dashboardsidebar/home.svg" alt="" />

              Accueil
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              @click="closeSidebar"
              to="/dashboard/recherche"
              :class="{ active: $route.path === '/dashboard/recherche' }"
            >
              <img src="/images/dashboardsidebar/search.svg" alt="" />

              Recherche
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              @click="closeSidebar"
              to="/dashboard/vos-offres-emploi"
              :class="{
                active:
                  $route.path.startsWith('/dashboard/vos-offres-emploi') ||
                  $route.path.includes('planifier-recrutement') ||
                  $route.path.includes('ajouter-offre'),
              }"
            >
              <img src="/images/dashboardsidebar/offremploi.svg" alt="" />
              Vos offres d'emploi
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              @click="closeSidebar"
              to="/dashboard/learning-center"
              :class="{ active: $route.path === '/dashboard/learning-center' }"
            >
              <img src="/images/dashboardsidebar/learningcenter.svg" alt="" />

              Learning Center
            </NuxtLink>
          </li>
        </ul>
        <button @click="logout" class="logout-button">Déconnexion</button>
      </nav>
    </aside>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useCookie } from "#app";
import { useRecruteursJson } from "@/composables/useRecruteurs";
const recruteurId = useCookie("recruteurId");
const { data: recruteurs } = useRecruteursJson();
const router = useRouter();
const recruiterInfo = computed(() => {
  // console.log("recruteurs.value:", recruteurs.value);
  // console.log("recruteurId.value:", recruteurId.value);

  if (recruteurs.value && recruteurs.value.recruteurs) {
    const recruiter = recruteurs.value.recruteurs.find(
      (r) => r.recruteur_id === recruteurId.value
    );
    // console.log("Found recruiter:", recruiter);
    // console.log(
    //   "Recruiter IDs:",
    //   recruteurs.value.recruteurs.map((r) => r.id)
    // );
    // console.log("Searching for ID:", recruteurId.value);
    // console.log("ID types:", {
    //   arrayIdType: typeof recruteurs.value.recruteurs[0].id,
    //   searchIdType: typeof recruteurId.value,
    // });
    if (recruiter) {
      return {
        nom: recruiter.nom,
        prenom: recruiter.prenom,
        image: recruiter.image,
        compagnie: recruiter.compagnie,
        poste: recruiter.poste,
      };
    }
  }

  // console.log("No matching recruiter found, returning default values");
  return {
    nom: "Recruteur",
    prenom: "",
    image: "/images/logosearch.svg",
  };
});
const closeSidebar = () => {
  if (isMobile.value) {
    sidebarActive.value = false;
  }
};

//console.log("Final recruiterInfo:", recruiterInfo.value);
const sidebarActive = ref(false);
const isMobile = ref(false);
const toggleSidebar = () => {
  sidebarActive.value = !sidebarActive.value;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 1024;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
const logout = () => {
  if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
    // Supprimer le cookie user_authenticated
    useCookie("user_authenticated").value = null;

    // Rediriger vers la page de connexion
    router.push("/login");
  }
};
</script>

<style lang="scss" scoped>
.dashboard-sidebar {
  position: relative;
}
.recruiter-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  img {
    border-radius: 100%;
    width: 52px;
    height: 52px;
  }
  p {
    margin-left: 10px;
    font-family: "Inter", sans-serif;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.18px;
    text-align: left;
    color: #000;
    span {
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.13px;
      text-align: left;
      color: #a4a4a4;
    }
  }
}
.active {
  /* Ajoutez vos styles pour le lien actif ici */
  font-weight: bold;
}
.dashboard-sidebar-menu {
  height: 70vh;
  li {
    a {
      height: 67px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      font-family: "Inter", sans-serif;
      font-size: 15px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.15px;
      text-align: left;
      color: #464646;
      padding: 10px 10px 10px 20px;
      position: relative;
      &.active,
      &:hover {
        background-color: #f8f8f8;
        color: #012e61;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto 0;
          width: 6px;
          height: 40px;
          flex-grow: 0;
          box-shadow: 0 8px 12px 0 rgba(135, 145, 233, 0.3);
          background-color: #012e61;
          border-radius: 0 5px 5px 0;
        }
      }
      &:hover {
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto 0;
          width: 6px;
          height: 40px;
          flex-grow: 0;
          box-shadow: 0 8px 12px 0 rgba(135, 145, 233, 0.3);
          background-color: #012e61;
          border-radius: 0 5px 5px 0;
        }
      }
      img {
        margin-right: 15px;
      }
    }
  }
}
.logout-button {
  background: #a4a4a4;
  color: #012e61;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 1em auto;
  display: flex;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
}
.hamburger-menu {
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  background: none;
  border: none;
  cursor: pointer;

  span {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px 0;
    background-color: #333;
    transition: all 0.3s ease;
  }
}

@media screen and (max-width: 768px) {
  .logo-wrapp {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: column !important;
  }
  .hamburger-menu {
    display: block;
  }

  .dashboard-sidebar {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100vh;
    transition: top 0.3s ease;
    z-index: 999;

    &.is-active {
      top: 0;
    }
  }
}
</style>
