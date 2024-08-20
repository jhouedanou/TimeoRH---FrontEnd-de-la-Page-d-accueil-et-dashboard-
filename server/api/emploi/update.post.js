import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const emploisPath = resolve('./static/api/emplois.json')
  
  let emplois = JSON.parse(readFileSync(emploisPath, 'utf-8'))
  const index = emplois.findIndex(e => e.id === body.id)
  
  if (index !== -1) {
    emplois[index] = { ...emplois[index], ...body }
    writeFileSync(emploisPath, JSON.stringify(emplois, null, 2), 'utf-8')
    return { success: true, emploi: emplois[index] }
  } else {
    return { success: false, message: 'Emploi non trouvé' }
  }
})
