<template>
  <div>
    <carousel :items-to-show="3">
      <slide v-for="job in limitedJobs" :key="job.id">
        {{ job.title }}
      </slide>
    </carousel>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import { usehomepageJobs } from "@/composables/useCarouselHomepageEmplois";

const props = defineProps({
  limit: {
    type: Number,
    default: 6,
  },
});

const { data } = usehomepageJobs();

const limitedJobs = computed(() => {
  return data.value.slice(0, props.limit);
});
</script>

<style scoped>
@import "vue3-carousel/dist/carousel.css";
</style>
