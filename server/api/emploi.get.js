import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(() => {
  const emploisPath = resolve('./server/data/emplois.json')
  const emplois = JSON.parse(readFileSync(emploisPath, 'utf-8'))
  return emplois
})