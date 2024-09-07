<template>
  <header class="container">
    <div id="HeaderFront" class="columns">
      <div class="column is-one-quarter-desktop is-12-mobile">
        <figure class="image">
          <NuxtLink to="/" aria-label="Retour à l'accueil">
            <NuxtImg
              :src="data.logo"
              alt="Logo"
              class="logo"
              loading="lazy"
              format="webp"
              quality="80"
            />
          </NuxtLink>
        </figure>
      </div>
      <div
        class="column is-flex is-justify-content-flex-end is-align-items-center is-12-mobile"
      >
        <div class="buttons">
          <NuxtLink to="/login" class="button is-primary login">
            {{ isAuthenticated ? "Dashboard" : "Connexion" }}
          </NuxtLink>
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

import { ref, onMounted } from "vue";
import { useCookie } from "#app";
const isAuthenticated = ref(false);
onMounted(() => {
  const userAuthenticatedCookie = useCookie("user_authenticated");
  console.log(userAuthenticatedCookie.value);
  isAuthenticated.value = userAuthenticatedCookie.value;
});
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  #HeaderFront {
    margin-top: 0px !important;
  }
}

.logo {
  width: 209px;
  height: 57px;
  flex-grow: 0;
  object-fit: contain;
}
header{

  position: absolute;
  width: 100vw !important;
  max-width:100vw !important;
  margin:0 auto;
    background: linear-gradient(to bottom, rgba(255, 255, 255,0.67) 0%, rgba(255, 255, 255, 0) 100%) !important;
  min-height: 83px;
  overflow:hidden;
}
#HeaderFront {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  min-height: 83px;
  display: flex;
  z-index: 100;
  max-width: 90vw;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 13px 16px;

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
  font-family: "Poppins", sans-serif;
  &:hover {
    background: #012e61;
    color: white;
  }
}
a {
  img {
    height: 52px;
  }
}
.sous-sections{
  &:hover {
    background: #012e61;
    color: white;
  }
}
@media (max-width: 1024px) {
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    .button {
      margin-bottom: 10px;
      width: 100%;
    }
  }
  a {
    img {
      max-width: 72px !important;
      height: auto !important;
    }
  }
}

</style>
