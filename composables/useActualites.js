import { ref, onMounted } from 'vue'
import actualitesJson from '@/static/api/actualites.json'

export function useactualites() {
  const actualites = ref(actualitesJson)

  const fetchactualites = () => {
    try {
      actualites.value = actualitesJson
    } catch (error) {
      console.error('Erreur lors de la récupération des données globales:', error)
    }
  }

  onMounted(fetchactualites)

  return {
    data: actualites
  }
}