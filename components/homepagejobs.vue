<template>
  <div class="jobscarousel">
    <div class="container">
      <h3 class="homepageTitle">{{ globalData.introSectionEmploi }}</h3>
      <client-only>
        <Swiper
          v-if="isSwiper"
          :modules="[Navigation, Pagination]"
          :slides-per-view="isMobile ? 1 : 3"
          :space-between="0"
          :navigation="true"
          :loop="true"
          :autoplay="{ delay: 2000, disableOnInteraction: true }"
          id="caro"
        >
          <SwiperSlide v-for="(emploi, index) in limitedData" :key="index">
            <emploiCard
              :imageHomepage="emploi.imageHomepage"
              :titre="emploi.titre"
              :societe="emploi.societe"
              :shortDescription="emploi.shortDescription"
              :type="emploi.type"
              :geolocalisation="emploi.geolocalisation"
              :experienceRequise="emploi.experienceRequise"
              :typeDeContrat="emploi.typeDeContrat"
            />
          </SwiperSlide>
        </Swiper>
      </client-only>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCarouselHomepageEmplois } from "@/composables/useCarouselHomepageEmplois";
import { useGlobalData } from "@/composables/useGlobalData";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import emploiCard from "./emploiCard.vue";
const { data: globalData } = useGlobalData();
const { data: carouselData } = useCarouselHomepageEmplois();
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

onMounted(() => {
  isSwiper.value = true;
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIfMobile);
});
</script>

<style scoped></style>
