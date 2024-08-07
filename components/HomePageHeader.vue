<template>
  <header class="container">
    <div id="HeaderFront" class="columns is-mobile">
      <div class="column is-one-quarter is-full-mobile">
        <figure class="image">
          <NuxtImg
            :src="data.logo"
            alt="Logo"
            class="logo"
            loading="lazy"
            format="webp"
            quality="80"
          />
        </figure>
      </div>
      <div
        class="column is-flex is-justify-content-flex-end is-align-items-center is-full-mobile"
      >
        <div class="buttons">
          <button class="button is-primary login" @click="downloadApp">
            {{ data.buttonText }}
          </button>
          <a :href="data.googlePlayUrl" target="_blank">
            <figure class="image">
              <NuxtImg
                loading="lazy"
                format="webp"
                quality="80"
                :src="data.googleplaylogo"
                alt="google play logo"
              />
            </figure>
          </a>
          <a :href="data.appStoreUrl" target="_blank">
            <figure class="image">
              <NuxtImg
                loading="lazy"
                format="webp"
                quality="80"
                :src="data.applelogo"
                alt="Apple store logo"
              />
            </figure>
          </a>
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

<style scoped lang="scss">
.logo {
  width: 209px;
  height: 57px;
  flex-grow: 0;
  object-fit: contain;
}
#HeaderFront {
  margin-top: 62px;
  max-width: 1246px;
  min-height: 83px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 13px 16px;
  background-color: #fff;
}
.login {
  width: 130px;
  height: 51px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px 59px;
  border-radius: 5px;
  background-color: #dc9756;
}
a {
  img {
    height: 52px;
  }
}
</style>
