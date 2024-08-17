import { ref, onMounted } from 'vue'
import EmploisJson from '@/static/api/emplois.json'
export function useEmploisJson() {
  const Emplois = ref(EmploisJson)

  const fetchEmplois = () => {
    try {
      Emplois.value = EmploisJson
    } catch (error) {
      console.error('Erreur lors de la récupération des données globales:', error)
    }
  }
  onMounted(fetchEmplois)
  return {
    data: Emplois
  }

}