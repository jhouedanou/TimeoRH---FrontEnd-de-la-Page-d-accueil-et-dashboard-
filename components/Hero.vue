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
      <h4 class="inter mb-6" v-html="data.soustitre"></h4>
   
      <div class="search-container Rectangle-2">
        <input
          type="text"
          :placeholder="data.searchbox"
          class="input is-medium"
          v-model="searchQuery"
          @keyup.enter="handleEnterKey"
        />
        <NuxtLink
          class="button is-primary is-medium"
          :to="{ path: '/offres', query: { titre: searchQuery } }"
        >
          <img src="/images/searchBtn.svg" alt="Search bouton" />
        </NuxtLink>
      </div>
      <ul class="columns sous-sections">
        <li class="is-4-desktop is-12-mobile" v-for="(section, index) in data.sousSections" :key="index">
    <span class="material-icons">{{ icons[index] }}</span>
    <p>{{ section }}</p>
    
  </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
#hero{
  position: relative;
  .columns{
    position: absolute;
    left: 0;
    right: 0;
    bottom: -145px;
    z-index: 10000;
    justify-content: space-evenly;
  }
}
.sous-sections {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
  position:absolute;
  left:0;
  right:0;
  margin:0 auto -5em auto;
  display: flex;align-items:center;justify-content: center;flex-direction: row;
  li {
    margin-bottom: 10px;
    font-size: 18px;
    color: #ffffff;
    display: flex;
    align-items: center;
    flex-wrap: wrap;  
    flex-direction: column;
    p{
font-family: "Inter", sans-serif;
font-size: 18px;
font-weight: 800;
font-stretch: normal;
font-style: normal;
line-height: 1.56;
letter-spacing: normal;
text-align: center;
color: #000;
margin: 1em 0;
text-align: center;
max-width:200px;
white-space: pre-wrap;
  }
    .material-icons {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      padding: 10px;
      border-radius: 50%;
      background-color: #ffffff;
      color: #022C5E;
      margin-right: 10px;
      font-size: 4em;
      border: 4px solid transparent;
      box-shadow: 0 0 0 14px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      
            &:hover {
              background-color: #022C5E;
              color: #ffffff;
            }
      
    
    }
  }
}

</style>
