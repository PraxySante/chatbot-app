# Chatbot app

```
See below all chabots app deployed. Chatbot app is a multi-domain application.
```

| 🧩 PROJECT      | ⚙️ DEV                                               | 🚀 PROD                                           |
| --------------- | ---------------------------------------------------- | ------------------------------------------------- |
| **FOCH**        | [FOCH](https://chatbotfoch.praxysante.fr/dev)        | [FOCH](https://chatbotfoch.praxysante.fr/)        |
| **HPSJ**        | [HPSJ](https://hpsj.praxysante.fr/dev)               | [HPSJ](https://hpsj.praxysante.fr/)               |
| **ENNOV**       | [ENNOV](https://ennov.praxysante.fr/dev)             | [ENNOV](https://ennov.praxysante.fr/)             |
| **DRAJES**      | [DRAJES](https://aideausport.praxysante.fr/dev)      | [DRAJES](https://aideausport.praxysante.fr/)      |
| **AHP**         | [AHP](https://ahp.praxysante.fr/dev)                 | [AHP](https://ahp.praxysante.fr/)                 |
| **RECO-CARDIO** | [RECO-CARDIO](https://reco-cardio.praxysante.fr/dev) | [RECO-CARDIO](https://reco-cardio.praxysante.fr/) |
| **CCIB**        | [CCIB](https://ccib.praxy.ai/dev)                    | [CCIB](https://ccib.praxy.ai/)                    |

## Plateforme chatbot – Praxysanté

Ce projet est une application web permettant aux particuliers comme aux spécialistes de rechercher des informations au travers des questions.

Chaque conversations sont enregistrées dans **Directus CMS**

---

## 🎯 Fonctionnalités principales

### 🧩 Global

- Identification de l'utilisateur au travers de son ip et d'un uuid session pour différencier si des personnes se trouvent sur le même réseau ( adresse ip identique )
- Authentification de l'utilisateur avec un M2M (Keycloack)
- Le token est utilisé sur les différents api (Transcription + LLM)
- environnements utilisés (dev-partenaires / prod-partenaires)

#### 👨‍💻 Mode libre

- L'utilisateur peut engager une conversation avec l'IA
- Les réponse de l'IA sont basées sur les recommandations de l'ESC

---

## 💻 Technologies utilisées

| Technologie                | Rôle                             |
| -------------------------- | -------------------------------- |
| **REACT (App Router)**     | Frontend                         |
| **TailwindCSS**            | Styling rapide et responsive     |
| **Node (express.js)**      | Backend (API)                    |
| **websocket (express.js)** | Frontend + Backend (API)         |
| **Node (express.js)**      | Backend (API)                    |
| **Directus CMS**           | Enregistrement des conversations |
| **API Transcription**      | Backend (API)                    |
| **API LLM**                | Backend (API)                    |

---

## ⚙️ Configuration

### Variables d’environnement

Crée un fichier `.env` à la racine avec les variables selon `.env.example`

Crée un fichier `.env` à la `./backend` avec les variables selon `.env.example`

Crée un fichier `.env` à la `./frontend` avec les variables selon `.env.example`

Pour avoir les variables d'environnements, il faut avoir un compte passbolt.

### Getting Started

Check if port 5000 is not already used before lauching any commands see below.

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

### ⚒️ New project

Ajouter des variables d'environnement pour le front : `frontend > .env `

```js
VITE_PROJECT_PROJECT = "PROJECT";
VITE_HOST_PROJECT = project.praxy.ai;
VITE_URL_API_FRONT_CHATBOT_PROJECT = "https://project.praxy.ai/dev/api";
VITE_WS_API_CHATBOT_PROJECT = "wss://project.praxy.ai/dev/ws";
```

Ajouter un clientConfig selon le fichier `clientConfig`

```js
'url':{
  host:,
  name:,
  ...
}
```

Ajouter le nouveau projet dans : `axiosAuthSecret`

```js
    case hostname.includes(import.meta.env.VITE_HOST_XXX):
      project = import.meta.env.VITE_PROJECT_XXX;
      baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_XXX;
      break;
```

Ajouter des variables d'environnement pour le back : `backend > .env `

```js
PROJECT_XXX = "XXX";
KEYCLOAK_USERNAME_XXX = "XXX";
KEYCLOAK_PASSWORD_XXX = "YYYYYY";
```

Ajouter des variables pour se logguer `authChatBot`

```js
case project.includes(String(process.env.PROJECT_XXX)):
dataProject = {
username: String(process.env.KEYCLOAK_USERNAME_XXX),
password: String(process.env.KEYCLOAK_PASSWORD_XXX),
};
break;
```
