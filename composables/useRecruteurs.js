import { ref, onMounted, getCurrentInstance } from 'vue'

export default function useRecruteurs() {
  const recruteurs = ref([])

  const fetchRecruteurs = async () => {
    const response = await fetch('/api/recruteurs')
    const data = await response.json()
    recruteurs.value = data
  }

  const addRecruteur = async (recruteur) => {
    const response = await fetch('/api/recruteurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recruteur),
    })
    const data = await response.json()
    recruteurs.value.push(data)
  }

  return {
    recruteurs,
    fetchRecruteurs,
    addRecruteur
  }
}