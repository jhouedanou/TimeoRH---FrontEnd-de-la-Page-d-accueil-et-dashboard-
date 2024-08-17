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
    </nav>
  </aside>
</template>

<style scoped>
.active {
  /* Ajoutez vos styles pour le lien actif ici */
  font-weight: bold;
}
</style>
