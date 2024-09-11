import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const { id, candidat_id } = event.context.params
  const body = await readBody(event)
  const emploisPath = resolve('./static/api/emplois.json')
  
  let emplois = JSON.parse(readFileSync(emploisPath, 'utf-8'))
  const emploi = emplois.find(e => e.id === parseInt(id))
  
  if (emploi) {
    const candidature = emploi.candidatures.find(c => c.candidat_id === parseInt(candidat_id))
    if (candidature) {
      candidature.estretenu = body.estretenu
      writeFileSync(emploisPath, JSON.stringify(emplois, null, 2), 'utf-8')
      return { success: true, emploi }
    }
  }
  
  return { success: false, message: 'Emploi ou candidature non trouvé' }
})
