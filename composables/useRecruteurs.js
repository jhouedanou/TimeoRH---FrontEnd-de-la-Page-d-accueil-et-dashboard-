import { ref, onMounted } from 'vue'
//recruteur.json
import RecruteursJson from '@/static/api/recruteurs.json'

export function useRecruteursJson() {
  const Recruteurs = ref(RecruteursJson)

  const fetchRecruteurs = () => {
    try {
      Recruteurs.value = RecruteursJson
    } catch (error) {
      console.error('Erreur lors de la récupération des données globales:', error)
    }
  }

  onMounted(fetchRecruteurs)

  return {
    data: Recruteurs
  }
}