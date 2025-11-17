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
    id: string;
    name: string;
  }[];
  feedback: string[];
  authAccountOption: boolean;
  sideBarOption: boolean;
  menuParameterOption: boolean;
  audioParameterOption: boolean;
  RecaptchaOption: boolean;
};

export const clientsConfig: Record<string, ClientConfig> = {
  'chatbotfoch.praxysante.fr': {
    host: import.meta.env.VITE_HOST_FOCH,
    name: 'Chat bot Hôpital Foch',
    project: import.meta.env.VITE_PROJECT_FOCH,
    logo: './bot-foch.png',
    title: "l'Hôpital Foch 🏥",
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
  'ahp.praxysante.fr': {
    host: import.meta.env.VITE_HOST_AHP,
    name: 'Chat bot Hôpital Américain de Paris',
    project: import.meta.env.VITE_PROJECT_AHP,
    logo: './bot-test.png',
    title: "l'Hôpital Américain de Paris",
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
  'hpsj.praxysante.fr': {
    host: import.meta.env.VITE_HOST_HPSJ,
    name: 'Chat bot Hôpital Paris Saint-Joseph',
    project: import.meta.env.VITE_PROJECT_HPSJ,
    logo: './bot-test.png',
    title: "l'Hôpital Paris Saint-Joseph",
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
  'ennov.praxysante.fr': {
    host: import.meta.env.VITE_HOST_ENNOV,
    name: 'Chat bot Ennov',
    project: import.meta.env.VITE_PROJECT_ENNOV,
    logo: './bot-test.png',
    title: 'Ennov',
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
  'aideausport.praxysante.fr': {
    host: import.meta.env.VITE_HOST_DRAJES,
    name: 'Chat bot DRAJES',
    project: import.meta.env.VITE_PROJECT_DRAJES,
    logo: './bot-test.png',
    title: 'DRAJES',
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
  'ccib.praxy.ai': {
    host: import.meta.env.VITE_HOST_CCIB,
    name: 'Chat bot CCIB',
    project: import.meta.env.VITE_PROJECT_CCIB,
    logo: './bot-test.png',
    title: 'CCIB',
    languages: [
      {
        id: 'en',
        name: 'English',
        icon: '🇬🇧',
      },
      {
        id: 'ar',
        name: 'Libanese',
        icon: '🇱🇧',
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
  localhost: {
    host: import.meta.env.VITE_HOST_DEV,
    name: `Chat bot test sur project ${import.meta.env.VITE_PROJECT_DEV}`,
    project: import.meta.env.VITE_PROJECT_DEV,
    logo: './bot-test.png',
    title: `${import.meta.env.VITE_PROJECT_DEV}`,
    languages: [
      {
        id: 'en',
        name: 'English',
        icon: '🇬🇧',
      },
      {
        id: 'ar',
        name: 'Libanese',
        icon: '🇱🇧',
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
    menuParameterOption: true,
    audioParameterOption: true,
    RecaptchaOption: false,
  },
};
