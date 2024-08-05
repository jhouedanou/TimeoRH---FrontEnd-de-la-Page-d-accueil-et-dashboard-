import { ref, useContext } from '@nuxtjs/composition-api'

export default function useEmplois() {
  const { $axios } = useContext()
  const emplois = ref([])

  const fetchEmplois = async () => {
    const { data } = await $axios.get('/api/emplois')
    emplois.value = data
  }

  const addEmploi = async (emploi) => {
    const { data } = await $axios.post('/api/emplois', emploi)
    emplois.value.push(data)
  }

  return {
    emplois,
    fetchEmplois,
    addEmploi
  }
}