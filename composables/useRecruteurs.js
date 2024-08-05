import { ref, useContext } from '@nuxtjs/composition-api'

export default function useRecruteurs() {
  const { $axios } = useContext()
  const recruteurs = ref([])

  const fetchRecruteurs = async () => {
    const { data } = await $axios.get('/api/recruteurs')
    recruteurs.value = data
  }

  const addRecruteur = async (recruteur) => {
    const { data } = await $axios.post('/api/recruteurs', recruteur)
    recruteurs.value.push(data)
  }

  return {
    recruteurs,
    fetchRecruteurs,
    addRecruteur
  }
}