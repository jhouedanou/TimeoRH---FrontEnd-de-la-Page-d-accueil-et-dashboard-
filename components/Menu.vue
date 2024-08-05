<template>
  <nav>
    <ul>
      <li><NuxtLink to="/candidats">Candidats</NuxtLink></li>
      <li><NuxtLink to="/recruteurs">Recruteurs</NuxtLink></li>
      <li><NuxtLink to="/emplois">Emplois</NuxtLink></li>
      <li><NuxtLink to="/interviews">Interviews</NuxtLink></li>
    </ul>
  </nav>
</template>

<script setup>
// Aucune logique supplémentaire n'est nécessaire dans ce composant
</script>

<style scoped>
nav {
  background-color: #f8f9fa;
  padding: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
}

li {
  margin: 0 1rem;
}

a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

a:hover {
  color: #0056b3;
}
</style>
