# TimeoRH - Frontend

Ce projet est le frontend de l'application TimeoRH, développé avec Nuxt.js (version 3).

## Prérequis

- Node.js (v14 ou supérieur)
- yarn

## Installation

1. Clonez ce dépôt :

git clone [https://github.com/votre-username/TimeoRH-frontend.git](https://github.com/jhouedanou/TimeoRH---FrontEnd-de-la-Page-d-accueil-et-dashboard-.git)

cd TimeoRH-frontend

2. Installez les dépendances :

yarn install

## Configuration

## Développement

Lancez le serveur de développement :

yarn dev

L'application sera accessible à l'adresse http://localhost:3000.

## Mise à jour des données

Pour mettre à jour les données de l'application, vous devez modifier les fichiers JSON situés dans le dossier `static/api/`. Voici les étapes à suivre :

1. Naviguez vers le dossier `static/api/` dans votre projet.

2. Ouvrez le fichier JSON que vous souhaitez modifier (par exemple, `candidats.json` ou `recruteurs.json`).

3. Modifiez les données selon vos besoins. Assurez-vous de respecter la structure JSON existante.

4. Sauvegardez le fichier après vos modifications.

5. Redémarrez votre serveur de développement pour que les changements soient pris en compte.

Exemple de modification du fichier `candidats.json` :

```json
[
  {
    "candidat_id": 1,
    "nom": "Nouveau Nom",
    "prenom": "Nouveau Prénom",
    "titre": "Nouveau Titre",
    ...
  },
  ...
]
```

## Association des candidatures à l'emploi

Pour associer les candidatures à un emploi spécifique, suivez ces étapes :

1. Ouvrez le fichier `static/api/emplois.json`.

2. Localisez l'objet emploi auquel vous souhaitez associer des candidatures.

3. Dans cet objet, trouvez ou ajoutez la propriété "candidatures". C'est un tableau qui contiendra les informations sur chaque candidature.

4. Pour chaque candidature, ajoutez un objet avec les propriétés suivantes :

   - `candidat_id`: l'identifiant unique du candidat
   - `adequation`: le pourcentage d'adéquation du candidat au poste
   - `correspondant`: les aspects du profil qui correspondent au poste
   - `necorrespondantpas`: les aspects du profil qui ne correspondent pas au poste
   - `decision`: la décision prise concernant cette candidature
   - `interviews`: un tableau d'objets représentant les entretiens planifiés

5. Sauvegardez le fichier après vos modifications.

Exemple d'une candidature associée à un emploi :

```json
"candidatures": [
  {
    "candidat_id": 1,
    "adequation": 87,
    "correspondant": "Diplômes, Expérience",
    "necorrespondantpas": "Géolocalisation",
    "decision": "En cours d'évaluation",
    "interviews": [
      {
        "id": 1,
        "date": "2023-05-15",
        "heure": "14:00",
        "raison": "Entretien technique",
        "lien": "https://www.zoom.com/meeting123"
      }
    ]
  }
]
```
