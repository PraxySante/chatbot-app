export type ClientConfig = {
  host: string;
  name: string;
  project: string;
  logo: string;
  title: string;
  languages: {
    id: string;
    name: string;
    icon: string;
  }[];
  modalMenu: {
    id: string,
    name: string,
  }[];
  feedback: string[];
  authAccountOption: boolean;
  sideBarOption: boolean;
  menuParameterOption: boolean;
  audioParameterOption: boolean;
  RecaptchaOption: boolean;
};

export const clientsConfig: Record<string, ClientConfig> = {
  "chatbotfoch.praxysante.fr": {
    host: import.meta.env.VITE_HOST_FOCH,
    name: 'Chat bot Hôpital Foch',
    project: 'Foch',
    logo: './bot-foch.png',
    title:
      "Posez vos questions concernant le fonctionnement de l'Hôpital Foch 🏥",
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
      {
        id: 'nl',
        name: 'Nederlands',
        icon: '🇳🇱',
      },
    ],
    modalMenu: [
      {
        id: 're-run',
        name: 'Rerun',
      },
      {
        id: 'settings',
        name: 'Settings',
      },
      {
        id: 'print',
        name: 'Print',
      },
      {
        id: 'record-screencast',
        name: 'Record ad screencast',
      },
      {
        id: 'about',
        name: 'About',
      },
    ],
    feedback: [
      'feedback_exhaustivity',
      'feedback_accuracy',
      'feedback_hallucinations',
    ],
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: false,
    audioParameterOption: true,
    RecaptchaOption: false,
  },
  "reco-cardio.praxysante.fr": {
    host: import.meta.env.VITE_HOST_RECO_CARDIO,
    name: "Chat bot recommandations cardiologiques de l'ESC",
    project: 'ESC',
    logo: './bot-test.png',
    title:
      "Posez vos questions concernant le fonctionnement de reconnaissance cardiologie",
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
      {
        id: 'nl',
        name: 'Nederlands',
        icon: '🇳🇱',
      },
    ],
    modalMenu: [
      {
        id: 're-run',
        name: 'Rerun',
      },
      {
        id: 'settings',
        name: 'Settings',
      },
      {
        id: 'print',
        name: 'Print',
      },
      {
        id: 'record-screencast',
        name: 'Record ad screencast',
      },
      {
        id: 'about',
        name: 'About',
      },
    ],
    feedback: [
      'feedback_exhaustivity',
      'feedback_accuracy',
      'feedback_hallucinations',
    ],
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: false,
    audioParameterOption: true,
    RecaptchaOption: false,
  },
  "ahp.praxysante.fr": {
    host: import.meta.env.VITE_HOST_AHP,
    name: 'Chat bot Hôpital Américain de Paris',
    project: 'AHP',
    logo: './bot-test.png',
    title:
      "Posez vos questions concernant le fonctionnement de recommandations cardiologiques de l'ESC",
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
      {
        id: 'nl',
        name: 'Nederlands',
        icon: '🇳🇱',
      },
    ],
    modalMenu: [
      {
        id: 're-run',
        name: 'Rerun',
      },
      {
        id: 'settings',
        name: 'Settings',
      },
      {
        id: 'print',
        name: 'Print',
      },
      {
        id: 'record-screencast',
        name: 'Record ad screencast',
      },
      {
        id: 'about',
        name: 'About',
      },
    ],
    feedback: [
      'feedback_exhaustivity',
      'feedback_accuracy',
      'feedback_hallucinations',
    ],
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: false,
    audioParameterOption: true,
    RecaptchaOption: false,
  },
  "localhost": {
    host: import.meta.env.VITE_HOST_RECO_CARDIO,
    name: "Chat bot test avec Foch",
    project: 'Foch',
    logo: './bot-test.png',
    title:
      "Posez vos questions concernant le fonctionnement de test avec Foch",
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
      {
        id: 'nl',
        name: 'Nederlands',
        icon: '🇳🇱',
      },
    ],
    modalMenu: [
      {
        id: 're-run',
        name: 'Rerun',
      },
      {
        id: 'settings',
        name: 'Settings',
      },
      {
        id: 'print',
        name: 'Print',
      },
      {
        id: 'record-screencast',
        name: 'Record ad screencast',
      },
      {
        id: 'about',
        name: 'About',
      },
    ],
    feedback: [
      'feedback_exhaustivity',
      'feedback_accuracy',
      'feedback_hallucinations',
    ],
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: false,
    audioParameterOption: true,
    RecaptchaOption: false,
  },
};
