<script setup>
import { useIndexContent } from "/composables/index";
import FrontendLayout from "/layouts/frontend.vue";

const { content } = useIndexContent();
</script>

<template>
  <FrontendLayout>
    <div class="container">
      <h1>{{ content.siteName }}</h1>
      <img :src="content.logo" :alt="content.siteName" />
      <p>{{ content.slogan }}</p>
      <router-link to="/connexion">Connexion</router-link>
    </div>
  </FrontendLayout>
</template>
