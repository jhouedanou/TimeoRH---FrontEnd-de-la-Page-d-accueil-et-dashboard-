import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const emploisPath = join(process.cwd(), './static/api/emplois.json');

  try {
    const emploisData = await readFile(emploisPath, 'utf-8');
    let emplois = JSON.parse(emploisData);
    emplois = emplois.filter(e => e.id !== parseInt(id));
    await writeFile(emploisPath, JSON.stringify(emplois, null, 2));
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre:", error);
    return { success: false, message: "Erreur lors de la suppression de l'offre" };
  }
});