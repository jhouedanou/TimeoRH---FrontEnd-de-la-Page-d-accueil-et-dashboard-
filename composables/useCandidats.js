import { ref, onMounted } from 'vue'
import CandidatsJson from '@/static/api/candidats.json'
export function useCandidatsJson() {
  const Candidats = ref(CandidatsJson)

  const fetchCandidats = () => {
    try {
      Candidats.value = CandidatsJson
    } catch (error) {
      console.error('Erreur lors de la récupération des données globales:', error)
    }
  }
  onMounted(fetchCandidats)
  return {
    data: Candidats
  }

}