<script setup>
import { useIndex } from "/composables/index";
const { data } = useIndex();
const searchQuery = ref("");
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${encodeURI(data.value.background)})`,
}));
const performSearch = () => {
  console.log("Recherche pour:", searchQuery.value);
};
const handleEnterKey = () => {
  if (searchQuery.value.trim()) {
    navigateTo({ path: "/offres", query: { titre: searchQuery.value } });
  }
};
//icones pour les sous secrtions 
const icons = ["people_outline", "handshake", "trending_up"];

</script>

<template>
  <div class="herowrapper" :style="backgroundStyle">
    <div id="hero" class="container">
      <h1 class="inter mt-6 mb-6" v-html="data.titre"></h1>
      <!-- <h4 class="inter mb-6" v-html="data.soustitre"></h4> -->

      <div class="search-container Rectangle-2">
        <input type="text" :placeholder="data.searchbox" class="input is-medium" v-model="searchQuery"
          @keyup.enter="handleEnterKey" />
        <NuxtLink class="button is-primary is-medium" :to="{ path: '/offres', query: { titre: searchQuery } }">
          <img src="/images/searchBtn.svg" alt="Search bouton" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  #hero {
    .columns {
      bottom: -68px !important;

      p {
        font-size: 12px !important;
      }
    }
  }

}


#hero {
  position: relative;

  .columns {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -145px;
    z-index: 10000;
    justify-content: space-evenly;
  }
}
</style>
