<template>
  <div class="learning-center">
    <h1 class="title">Centre d'apprentissage</h1>

    <div class="filters">
      <button
        @click="selectedCategory = ''"
        :class="{ active: selectedCategory === '' }"
      >
        Tous
      </button>
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        :class="{ active: selectedCategory === category }"
      >
        {{ category }}
      </button>
    </div>

    <div class="video-grid">
      <div
        v-for="video in filteredVideos"
        :key="video.id"
        class="video-item"
        @click="openVideo(video)"
      >
        <img :src="video.miniature" :alt="video.titre" />
        <p>{{ video.titre }}</p>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="selectedVideo" class="video-popup">
        <div class="video-popup-content">
          <button @click="closeVideo" class="close-button">&times;</button>
          <h2>{{ selectedVideo.titre }}</h2>
          <iframe
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${selectedVideo.youtubeId}`"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useVideos } from "@/composables/useVideos";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { videos, categories } = useVideos();
const selectedCategory = ref("");
const selectedVideo = ref(null);

const filteredVideos = computed(() => {
  if (selectedCategory.value === "") {
    return videos.value;
  }
  return videos.value.filter(
    (video) => video.categorie === selectedCategory.value
  );
});

const openVideo = (video) => {
  selectedVideo.value = video;
};

const closeVideo = () => {
  selectedVideo.value = null;
};
</script>

<style scoped>
.learning-center {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.filters button {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

.filters button.active {
  background-color: #007bff;
  color: #fff;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.video-item {
  cursor: pointer;
}

.video-item img {
  width: 100%;
  height: auto;
}

.video-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
