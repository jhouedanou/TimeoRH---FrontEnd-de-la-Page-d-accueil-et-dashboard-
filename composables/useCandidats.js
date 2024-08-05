import { ref, useContext } from '@nuxtjs/composition-api'

export default function useCandidats() {
  const { $axios } = useContext()
  const candidats = ref([])

  const fetchCandidats = async () => {
    const { data } = await $axios.get('/api/candidats')
    candidats.value = data
  }

  const addCandidat = async (candidat) => {
    const { data } = await $axios.post('/api/candidats', candidat)
    candidats.value.push(data)
  }

  return {
    candidats,
    fetchCandidats,
    addCandidat
  }
}