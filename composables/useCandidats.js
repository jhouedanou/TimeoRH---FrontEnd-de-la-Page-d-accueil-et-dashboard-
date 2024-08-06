import { ref } from 'vue'

export default function useCandidats() {
  const candidats = ref([])

  const fetchCandidats = async () => {
    const response = await fetch('/api/candidats')
    const data = await response.json()
    candidats.value = data
  }

  const addCandidat = async (candidat) => {
    const response = await fetch('/api/candidats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candidat),
    })
    const data = await response.json()
    candidats.value.push(data)
  }

  return {
    candidats,
    fetchCandidats,
    addCandidat
  }
}