import { ref, onMounted } from 'vue'
import chartDataJson from '@/static/api/chartData.json'

export function useChartData() {
  const chartData = ref(null)

  const fetchChartData = () => {
    try {
      chartData.value = chartDataJson
    } catch (error) {
      console.error('Erreur lors de la récupération des données du graphique:', error)
    }
  }

  onMounted(fetchChartData)

  return {
    chartData
  }
}