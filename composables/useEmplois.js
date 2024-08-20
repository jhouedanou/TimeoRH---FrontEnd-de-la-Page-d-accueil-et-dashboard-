import { ref } from 'vue'
import EmploisJson from '@/static/api/emplois.json'

export function useEmploisJson() {
  const Emplois = ref(EmploisJson)

  const updateEmploi = async (updatedEmploi) => {
    try {
      const response = await fetch('/api/emploi/update', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmploi),
      })
      const result = await response.json()
      if (result.success) {
        const index = Emplois.value.findIndex(e => e.id === updatedEmploi.id)
        if (index !== -1) {
          Emplois.value[index] = result.emploi
        }
      }
      return result  // Retourner le résultat
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'emploi:', error)
      return { success: false, error: error.message }  // Retourner une erreur en cas d'échec
    }
  }

  return {
    data: Emplois,
    updateEmploi
  }
}
