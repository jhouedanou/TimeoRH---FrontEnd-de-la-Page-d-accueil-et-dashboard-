<template>
  <div class="recruiterwrapper">
    <div class="intro">
      <h3 v-html="data.titreSectionRecruteurs"></h3>
      <h4 v-html="data.soustitreSectionRecruteurs"></h4>
    </div>
    <div class="container">
      <div class="columns is-desktop">
        <div
          v-for="(box, index) in data.recrutementBlock"
          :key="index"
          class="column is-4-desktop is-12-mobile is-flex is-align-items-center is-flex-direction-column is-justify-content-center recruitcolumn"
        >
          <img :src="box.image" :alt="'Image ' + (index + 1)" />
          <h2>{{ box.titre }}</h2>
          <p>{{ box.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGlobalData } from "@/composables/useGlobalData";
const { data } = useGlobalData();
</script>
<style scoped lang="scss"></style>
