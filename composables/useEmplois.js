import { ref } from 'vue'
import EmploisJson from '@/static/api/emplois.json'

export function useEmploisJson() {
  const Emplois = ref(EmploisJson)

  const updateEmploiStatusDansLaListe = async (updatedEmploi) => {
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
      return result
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'emploi:', error)
      return { success: false, error: error.message }
    }
  }

  const saveNewEmploi = async (emploiData) => {
    try {
      const response = await fetch('/api/emploi/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emploiData),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde des données');
      }
      const result = await response.json();
      Emplois.value.push(result);
      return result;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du nouvel emploi:', error);
      throw error;
    }
  };
  
  


  return {
    data: Emplois,
    updateEmploiStatusDansLaListe,
    saveNewEmploi

  }
}
