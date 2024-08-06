import { ref, onMounted } from 'vue'
import globalDataJson from '@/static/api/globalData.json'

export function useGlobalData() {
  const globalData = ref(globalDataJson)

  const fetchGlobalData = () => {
    try {
      globalData.value = globalDataJson
    } catch (error) {
      console.error('Erreur lors de la récupération des données globales:', error)
    }
  }

  onMounted(fetchGlobalData)

  return {
    data: globalData
  }
}