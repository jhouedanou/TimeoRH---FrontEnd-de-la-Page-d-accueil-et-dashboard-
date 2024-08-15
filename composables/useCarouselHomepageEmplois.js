import { ref, onMounted } from 'vue'
import emploisDataJson from '@/static/api/emplois.json'

export function useCarouselHomepageEmplois() {
  const emplois = ref(emploisDataJson)

  const fetchEmplois = () => {
    try {
      emplois.value = emploisDataJson
      console.log('Emplois chargés:', emplois.value)
    } catch (error) {
      console.error('Erreur lors de la récupération des emplois:', error)
    }
  }

  onMounted(fetchEmplois)


  return {
    data: emplois
  }
}
