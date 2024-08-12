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
</script>

<template>
  <div class="herowrapper" :style="backgroundStyle">
    <div id="hero" class="container">
      <h1 class="inter mt-6 mb-6" v-html="data.titre"></h1>
      <h4 class="inter mb-6" v-html="data.soustitre"></h4>
      <div class="search-container Rectangle-2">
        <input
          type="text"
          :placeholder="data.searchbox"
          class="input is-medium"
          v-model="searchQuery"
        />
        <button class="button is-primary is-medium" @click="performSearch">
          <img src="/images/searchBtn.svg" alt="Search bouton" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
