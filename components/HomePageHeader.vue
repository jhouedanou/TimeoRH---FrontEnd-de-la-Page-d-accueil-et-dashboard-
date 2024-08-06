<template>
  <header class="container">
    <div class="row">
      <div class="col-md-3 col-xs-12">
        <NuxtImg
          :src="data.logo"
          alt="Logo"
          class="logo"
          loading="lazy"
          format="webp"
          quality="80"
        />
      </div>
      <div class="col-9">
        <div class="buttons-container">
          <button @click="downloadApp">{{ data.buttonText }}</button>
          <a :href="data.googlePlayUrl" target="_blank"
            ><NuxtImg
              loading="lazy"
              format="webp"
              quality="80"
              :src="data.googleplaylogo"
              alt="google play logo"
          /></a>
          <a :href="data.appStoreUrl" target="_blank"
            ><NuxtImg
              loading="lazy"
              format="webp"
              quality="80"
              :src="data.applelogo"
              alt="Apple store logo"
          /></a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useGlobalData } from "@/composables/useGlobalData";
const { data } = useGlobalData();
console.log(useGlobalData());
const downloadApp = () => {
  // Logique pour le téléchargement de l'application
};
</script>
