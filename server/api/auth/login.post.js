import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const recruteurs = JSON.parse(readFileSync(resolve('./static/api/recruteurs.json'), 'utf-8'))
  const user = recruteurs.recruteurs.find(u => u.email === email && atob(u.motdepasse) === password)

  if (user) {
    return { user }
  } else {
    throw createError({ statusCode: 401, message: 'Identifiants incorrects' })
  }
})
