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

## Gestion des données d'emplois

Les données d'emplois sont maintenant gérées côté serveur pour une meilleure sécurité.

### Pour les développeurs Laravel :

1. Créez une API dans votre application Laravel qui interagit avec le fichier `server/data/*****.json`.
2. Implémentez des routes pour la lecture et la mise à jour des données d'emplois.
3. Utilisez des méthodes HTTP appropriées (GET pour la lecture, POST/PUT pour la mise à jour).
4. Assurez-vous d'implémenter une authentification et une autorisation adéquates pour sécuriser l'accès à l'API.
