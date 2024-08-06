import { ref, onMounted } from 'vue'

export function useGlobalData() {
  const globalData = ref({})

  const fetchGlobalData = async () => {
    try {
      const response = await fetch('globalData.json')
      globalData.value = await response.json()
    } catch (error) {
      console.error('Erreur lors de la récupération des données globales:', error)
    }
  }

  onMounted(fetchGlobalData)

  return {
    data: globalData
  }
}