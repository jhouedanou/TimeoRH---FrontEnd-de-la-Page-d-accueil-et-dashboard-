import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'POST') {
    const body = await readBody(event)
    const filePath = resolve('static/api/emplois.json')
    
    let emplois = JSON.parse(readFileSync(filePath, 'utf-8'))
    
    body.id = Date.now()
    emplois.push(body)
    
    writeFileSync(filePath, JSON.stringify(emplois, null, 2))
    
    return { success: true, emploi: body }
  }
  
  return { success: false, message: 'Method not allowed' }
})
