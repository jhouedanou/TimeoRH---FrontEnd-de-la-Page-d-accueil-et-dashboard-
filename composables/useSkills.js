import { ref, onMounted } from 'vue'
import baseSkillsJson from '@/static/api/competences/base.json'
import advancedSkillsJson from '@/static/api/competences/avancees.json'

export function useSkills() {
  const basicSkills = ref(baseSkillsJson)
  const advancedSkills = ref(advancedSkillsJson)

  const fetchSkills = () => {
    try {
      basicSkills.value = baseSkillsJson
      advancedSkills.value = advancedSkillsJson
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences:', error)
    }
  }

  onMounted(fetchSkills)

  return {
    basicSkills,
    advancedSkills
  }
}
