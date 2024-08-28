<template>
  <div class="learning-center">
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
      <div v-for="video in paginatedVideos" :key="video.id" class="video-item">
        <div class="video-card">
          <div class="video-category-chip">{{ video.categorie }}</div>

          <img :src="video.miniature" :alt="video.titre" />
          <div class="inside p-5">
            <span>{{ video.date }}</span>
            <h3>{{ video.titre }}</h3>
            <p>{{ video.description }}</p>
          </div>
          <div class="button btn-video" @click="openVideo(video)">Voir</div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button
        v-for="page in Math.ceil(filteredVideos.length / itemsPerPage)"
        :key="page"
        @click="changePage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
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
  middleware: ["auth"],
  layout: "dashboard",
});
const itemsPerPage = 8;
const currentPage = ref(1);

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
const paginatedVideos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredVideos.value.slice(start, end);
});
const changePage = (page) => {
  currentPage.value = page;
};
const openVideo = (video) => {
  selectedVideo.value = video;
};

const closeVideo = () => {
  selectedVideo.value = null;
};
</script>

<style lang="scss" scoped>
.learning-center {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.filters button {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.filters button.active {
  background-color: var(--secondary-color);
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
  background-color: rgba(var(--secondary-color-rgb), 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(5px);
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
.video-item {
  position: relative;
}

.video-category-chip {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8em;
  z-index: 1;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

.pagination button.active {
  background-color: #dc9756;
  color: #fff;
}
.video-card {
  padding: 0 0 21px;
  border-radius: 14px;
  box-shadow: 0 10px 60px 0 rgba(38, 45, 118, 0.08);
  background-color: #fff;
  padding: 0em;
  overflow: hidden;
}
.inside {
  span {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #777795;
  }
  h3 {
    font-family: "Inter", sans-serif;
    font-size: 15.5px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.39px;
    text-align: left;
    color: #012e61;
  }
  p {
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #4d4d4d;
  }
}
.btn-video {
  width: 65px;
  height: 35px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #012e61;
  margin: 1em;
}
@media screen and (max-width: 768px) {
  .filters {
    overflow-x: scroll;
  }
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
