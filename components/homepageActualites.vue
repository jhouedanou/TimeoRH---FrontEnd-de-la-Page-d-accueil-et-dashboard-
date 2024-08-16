<script setup>
const { data: carouselData } = useactualites();
const isSwiper = ref(false);
const isMobile = ref(false);
const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};
const props = defineProps({
  limit: {
    type: Number,
    default: 6,
  },
});
const limitedData = computed(() => {
  return Array.isArray(carouselData.value)
    ? carouselData.value.slice(0, props.limit)
    : [];
});
</script>
<template>
  <div id="actualites" class="container">
    <div class="columns is-desktop">
      <div
        v-for="actualite in limitedData"
        :key="actualite.id"
        class="column is-4-desktop is-12-mobile is-flex is-align-items-center is-flex-direction-column is-justify-content-center recruitcolumn"
      >
        <div class="actualite-card">
          <img :src="actualite.imageHomepage" :alt="actualite.titre" />
        </div>
        <div>{{ actualite.id }}</div>
        <div>{{ actualite.titre }}</div>
        <div>{{ actualite.resume }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
