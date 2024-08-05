import { ref, useContext } from '@nuxtjs/composition-api'

export default function useInterviews() {
  const { $axios } = useContext()
  const interviews = ref([])

  const fetchInterviews = async () => {
    const { data } = await $axios.get('/api/interviews')
    interviews.value = data
  }

  const addInterview = async (interview) => {
    const { data } = await $axios.post('/api/interviews', interview)
    interviews.value.push(data)
  }

  return {
    interviews,
    fetchInterviews,
    addInterview
  }
}