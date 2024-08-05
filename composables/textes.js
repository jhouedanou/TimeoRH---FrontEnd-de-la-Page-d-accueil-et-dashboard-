
// composables/useTexts.js
import { ref, onMounted } from 'vue'
import axios from 'axios'

export function Textes() {
  const texts = ref([])

  async function fetchTexts() {
    try {
      //insérer l'adresse de l'api ici, sous cette forme
     // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
     const response = await axios.get('/api.json')
     texts.value = response.data
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
