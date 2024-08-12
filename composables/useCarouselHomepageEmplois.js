import { ref, onMounted } from 'vue'
import homepageJobsJson from '@/static/api/jobs.json'

export function usehomepageJobs() {
  const homepageJobs = ref(homepageJobsJson)

  const fetchhomepageJobs = () => {
    try {
      homepageJobs.value = homepageJobsJson
    } catch (error) {
      console.error('Erreur lors de la récupération des données globales:', error)
    }
  }

  onMounted(fetchhomepageJobs)

  return {
    data: homepageJobs
  }
}