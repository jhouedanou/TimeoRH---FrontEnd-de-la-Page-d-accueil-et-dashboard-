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
