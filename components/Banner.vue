<script setup>
import { ref, computed } from "vue";
import { useIndex } from "/composables/index";

const { data } = useIndex();

const searchQuery = ref("");

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${encodeURI(data.value.background)})`,
}));

const performSearch = () => {
  console.log("Recherche pour:", searchQuery.value);
};
</script>

<template>
  <div class="bannerwrapper" :style="backgroundStyle">
    <div id="banner" class="container">
      <h1 class="inter mt-6" v-html="data.titrepageOffre"></h1>
      <div class="breadcrumb mb-4">
        <div class="breadcrumb-item">
          <nuxt-link to="/">Accueil</nuxt-link>
        </div>
        <div class="breadcrumb-item">/</div>
        <div class="breadcrumb-item">
          <nuxt-link to="/offres">Offres d'emploi</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
