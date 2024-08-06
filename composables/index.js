import { ref, onMounted } from 'vue'

export function useIndexContent() {
  const content = ref({})

  async function fetchContent() {
    try {
      const response = await fetch('/api/index.json')
      const data = await response.json()
      content.value = data
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
