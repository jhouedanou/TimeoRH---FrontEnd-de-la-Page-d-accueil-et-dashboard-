<template>
  <aside class="dashboard-sidebar">
    <nav>
      <ul>
        <li>
          <NuxtLink
            to="/dashboard"
            :class="{ active: $route.path === '/dashboard' }"
          >
            Accueil
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/dashboard/recherche"
            :class="{ active: $route.path === '/dashboard/recherche' }"
          >
            Recherche
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/dashboard/vos-offres-emploi"
            :class="{ active: $route.path === '/dashboard/vos-offres-emploi' }"
          >
            Vos offres d'emploi
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/dashboard/learning-center"
            :class="{ active: $route.path === '/dashboard/learning-center' }"
          >
            Learning Center
          </NuxtLink>
        </li>
      </ul>
      <button @click="logout" class="logout-button">Déconnexion</button>
    </nav>
  </aside>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();

const logout = () => {
  if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
    // Supprimer le cookie user_authenticated
    useCookie("user_authenticated").value = null;

    // Rediriger vers la page de connexion
    router.push("/login");
  }
};
</script>

<style scoped>
.logout-button {
  /* Ajoutez vos styles pour le bouton de déconnexion ici */
}
</style>
<style scoped>
.active {
  /* Ajoutez vos styles pour le lien actif ici */
  font-weight: bold;
}
</style>
