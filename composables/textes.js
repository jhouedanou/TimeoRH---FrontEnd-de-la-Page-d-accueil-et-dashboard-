// composables/useTexts.js
import { ref, onMounted } from 'vue'

export function Textes() {
  const texts = ref([])

  async function fetchTexts() {
    try {
      //insérer l'adresse de l'api ici, sous cette forme
      // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const response = await fetch('/api.json')
      texts.value = await response.json()
    } catch (error) {
      console.error('Erreur lors de la récupération des textes:', error)
    }
  }

  onMounted(fetchTexts)

  return {
    texts,
    fetchTexts
  }
}
