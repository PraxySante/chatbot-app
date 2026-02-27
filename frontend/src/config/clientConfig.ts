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
  displayDocument: boolean;
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
    displayDocument: true,
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
    displayDocument: true,
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
    displayDocument: true,
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
    displayDocument: true,
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
        name: 'Lebanese',
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
    displayDocument: true,
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: true,
    audioParameterOption: false,
    RecaptchaOption: false,
  },
  'deuxiemeavis.praxysante.fr': {
    host: import.meta.env.VITE_HOST_DA,
    name: 'Chat bot Deuxième avis',
    project: import.meta.env.VITE_PROJECT_DA,
    logo: './bot-test.png',
    title: 'Deuxième avis',
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
    displayDocument: true,
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: false,
    audioParameterOption: true,
    RecaptchaOption: false,
  },
  'montecarlojointrepair.praxysante.fr': {
    host: import.meta.env.VITE_HOST_MCJR,
    name: 'Chat bot Monte-Carlo Joint Repair',
    project: import.meta.env.VITE_PROJECT_MCJR,
    logo: './bot-test.png',
    title: 'MCJR',
    languages: [
      {
        id: 'en',
        name: 'English',
        icon: '🇬🇧',
      },
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
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
    displayDocument: false,
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: true,
    audioParameterOption: false,
    RecaptchaOption: false,
  },
  'hfar.praxysante.fr': {
    host: import.meta.env.VITE_HOST_HFAR,
    name: 'Chat bot Hôpital Fondation Rothschild',
    project: import.meta.env.VITE_PROJECT_HFAR,
    logo: './bot-test.png',
    title: "l'Hôpital Fondation Rothschild",
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
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
    displayDocument: true,
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: false,
    audioParameterOption: true,
    RecaptchaOption: false,
  },
  'cms.praxysante.fr': {
    host: import.meta.env.VITE_HOST_CMS,
    name: 'Chat bot de la clinique CMS',
    project: import.meta.env.VITE_PROJECT_CMS,
    logo: './bot-test.png',
    title: 'CMS',
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
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
    displayDocument: true,
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: false,
    audioParameterOption: true,
    RecaptchaOption: false,
  },
  'centre-iridis.praxysante.fr': {
    host: import.meta.env.VITE_HOST_IRIDIS,
    name: 'Chat bot du centre IRIDIS',
    project: import.meta.env.VITE_PROJECT_IRIDIS,
    logo: './bot-test.png',
    title: 'IRIDIS',
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
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
    displayDocument: true,
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
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
      {
        id: 'en',
        name: 'English',
        icon: '🇬🇧',
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
    displayDocument: true,
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: true,
    audioParameterOption: false,
    RecaptchaOption: false,
  },
};
