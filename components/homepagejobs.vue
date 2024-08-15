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
            <div class="emploi-card">
              <div class="white">
                <img :src="emploi.imageHomepage" alt="" />
                <div class="white-content">
                  <h3 class="Email-Support-Agent">{{ emploi.titre }}</h3>
                  <h4>{{ emploi.societe }}</h4>
                  <p>{{ emploi.shortDescription }}</p>
                </div>
                <div class="white-content-2">
                  <p><img src="/images/time.svg" alt="" />{{ emploi.type }}</p>
                  <p>
                    <img src="/images/localisation.svg" alt="" />{{
                      emploi.geolocalisation
                    }}
                  </p>
                </div>
              </div>
            </div>
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
