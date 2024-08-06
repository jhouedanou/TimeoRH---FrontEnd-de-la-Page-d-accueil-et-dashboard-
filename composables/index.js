
import { ref, onMounted } from 'vue'
import indexJson from '@/static/api/index.json'

export function useindex() {
  const index = ref(indexJson)

  const fetchindex = () => {
    try {
      index.value = indexJson
    } catch (error) {
      console.error('Erreur lors de la récupération des données globales:', error)
    }
  }

  onMounted(fetchindex)

  return {
    data: index
  }
}