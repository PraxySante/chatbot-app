type LogoClientConfig = {
  urlImg: string;
  width: string;
  height: string;
};

type LanguagesClientConfig = {
  id: string;
  name: string;
  icon: string;
};

type ModalMenuClientConfig = {
  id: string;
  name: string;
};

export type ClientConfig = {
  host: string;
  name: string;
  project: string;
  logo: LogoClientConfig;
  title: string;
  languages: LanguagesClientConfig[];
  modalMenu: ModalMenuClientConfig[];
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
    logo: {
      urlImg: './bot-foch.png',
      width: '14',
      height: '14',
    },
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
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
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
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
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
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
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
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
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
    logo: {
      urlImg: './LOGO-DAFR-2023-COLOR-DARK.png',
      width: '32',
      height: '14',
    },
    title: 'Deuxième avis',
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
  'montecarlojointrepair.praxysante.fr': {
    host: import.meta.env.VITE_HOST_MCJR,
    name: 'Chat bot Monte-Carlo Joint Repair',
    project: import.meta.env.VITE_PROJECT_MCJR,
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
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
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
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
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
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
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
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
  'dermomedicalcenter.praxysante.fr': {
    host: import.meta.env.VITE_HOST_DERMO,
    name: 'Chat bot du centre DermoMedicalCenter',
    project: import.meta.env.VITE_PROJECT_DERMO,
    logo: {
      urlImg: './bot-test.png',
      width: '14',
      height: '14',
    },
    title: 'DermoMedicalCenter',
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
    logo: {
      urlImg: './LOGO-DAFR-2023-COLOR-DARK.png',
      width: '10',
      height: '12',
    },
    title: `${import.meta.env.VITE_PROJECT_DEV}`,
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
      // {
      //   id: 'en',
      //   name: 'English',
      //   icon: '🇬🇧',
      // },
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
