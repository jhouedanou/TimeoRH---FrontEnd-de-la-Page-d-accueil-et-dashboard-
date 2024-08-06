import { ref, onMounted, getCurrentInstance } from 'vue'

export default function useInterviews() {
  const interviews = ref([])

  const fetchInterviews = async () => {
    const response = await fetch('/api/interviews')
    const data = await response.json()
    interviews.value = data
  }

  const addInterview = async (interview) => {
    const response = await fetch('/api/interviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interview),
    })
    const data = await response.json()
    interviews.value.push(data)
  }

  return {
    interviews,
    fetchInterviews,
    addInterview
  }
}