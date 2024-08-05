import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useIndexContent() {
  const content = ref({})

  async function fetchContent() {
    try {
      const response = await axios.get('/index.json')
      content.value = response.data
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu:', error)
    }
  }

  onMounted(fetchContent)

  return {
    content,
    fetchContent
  }
}
