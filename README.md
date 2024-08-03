# TimeoRH - Frontend

Ce projet est le frontend de l'application TimeoRH, développé avec Nuxt.js.

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation

1. Clonez ce dépôt :

git clone https://github.com/votre-username/TimeoRH-frontend.git
cd TimeoRH-frontend

2. Installez les dépendances :

npm install

ou
yarn install

3. Copiez le fichier `.env.example` en `.env` et configurez les variables d'environnement :

cp .env.example .env

## Configuration

### Utilisation du fichier data.json

Si vous utilisez un fichier data.json pour le développement ou les tests :

Placez le fichier data.json dans le dossier static/ de votre projet Nuxt.

Vous pouvez accéder aux données comme ceci :

async fetchLocalData() {
  const response = await this.$axios.get('/data.json');
  this.localData = response.data;
}

## Développement

Lancez le serveur de développement :

npm run dev
# ou
yarn dev

L'application sera accessible à l'adresse http://localhost:3000.

## Production

Construisez l'application pour la production :

npm run build
# ou
yarn build

Lancez le serveur de production :

npm run start
# ou
yarn start

## Fonctionnalités principales

- Page d'accueil responsive
- Tableau de bord avec graphiques et visualisations
- Tables de données responsives avec filtrage et recherche
- Système d'onglets pour une navigation facile

## Structure du projet

- pages/ : Contient les pages de l'application
- components/ : Composants réutilisables
- layouts/ : Layouts de l'application
- store/ : État global de l'application (Vuex)
- static/ : Fichiers statiques (dont data.json)
- plugins/ : Plugins Nuxt (Bootstrap, etc.)

## Contribution

1. Forkez le projet
2. Créez votre branche de fonctionnalité (git checkout -b feature/AmazingFeature)
3. Committez vos changements (git commit -m 'Add some AmazingFeature')
4. Poussez vers la branche (git push origin feature/AmazingFeature)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT.
‡