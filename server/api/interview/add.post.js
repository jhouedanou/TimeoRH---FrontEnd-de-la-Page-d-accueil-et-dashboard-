import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { emploiId, candidatId, ...interviewData } = body;
    
    const emploisPath = resolve('./static/api/emplois.json');
    let emplois = JSON.parse(readFileSync(emploisPath, 'utf-8'));
    
    const emploi = emplois.find(e => e.id === emploiId);
    if (!emploi) {
      return { success: false, message: 'Emploi non trouvé' };
    }
    
    const candidature = emploi.candidatures.find(c => c.candidat_id === candidatId);
    if (!candidature) {
      return { success: false, message: 'Candidat non trouvé pour cet emploi' };
    }
    
    if (!candidature.interviews) {
      candidature.interviews = [];
    }
    
    const newInterview = {
      id: candidature.interviews.length + 1,
      ...interviewData
    };
    candidature.interviews.push(newInterview);
    
    writeFileSync(emploisPath, JSON.stringify(emplois, null, 2));
    
    return { success: true, emploi: emploi };
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'interview:', error);
    return { success: false, message: 'Une erreur est survenue lors de l\'ajout de l\'interview' };
  }
});
