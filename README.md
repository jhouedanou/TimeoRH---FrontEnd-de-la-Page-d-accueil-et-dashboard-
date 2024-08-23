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

## Données

Les données (textes, liens, images) sont dans les fichiers .json, dans le dossier static/api

## Gestion des données de l'application :

1. Créez une API dans votre application Laravel, en vous basant sur la structure des fichiers .json contenus dans le dossier /static/api/
2. Mettre le lien de l'API dans le composable approprié ( @/composables)
3. Au besoin, modifiez les méthodes HTTP appropriées (GET pour la lecture, POST/PUT pour la mise à jour).
