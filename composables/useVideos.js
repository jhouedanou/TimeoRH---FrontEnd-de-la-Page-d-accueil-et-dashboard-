import { ref, onMounted } from 'vue'
import videosJson from '@/static/api/videos.json'

export function useVideos() {
  const videos = ref([])
  const categories = ref([])

  const fetchVideos = () => {
    videos.value = videosJson
    categories.value = [...new Set(videos.value.map(video => video.categorie))]
  }

  onMounted(fetchVideos)

  return {
    videos,
    categories
  }
}