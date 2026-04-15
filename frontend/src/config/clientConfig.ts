type LogoClientConfig = {
  urlImg: string;
  width: number;
  height: number;
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

type OptionsClientConfig = {
  isReformulateAuto: boolean;
  displayDocument: boolean;
  authAccountOption: boolean;
  sideBarOption: boolean;
  menuParameterOption: boolean;
  audioParameterOption: boolean;
  RecaptchaOption: boolean;
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
  options: OptionsClientConfig;
};

export const clientsConfig: Record<string, ClientConfig> = {
  'chatbotfoch.praxysante.fr': {
    host: import.meta.env.VITE_HOST_FOCH,
    name: 'Chat bot Hôpital Foch',
    project: import.meta.env.VITE_PROJECT_FOCH,
    logo: {
      urlImg: './bot-foch.png',
      width: 12,
      height: 12,
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
    options: {
      isReformulateAuto: true,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'ahp.praxysante.fr': {
    host: import.meta.env.VITE_HOST_AHP,
    name: 'Chat bot Hôpital Américain de Paris',
    project: import.meta.env.VITE_PROJECT_AHP,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
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
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'hpsj.praxysante.fr': {
    host: import.meta.env.VITE_HOST_HPSJ,
    name: 'Chat bot Hôpital Paris Saint-Joseph',
    project: import.meta.env.VITE_PROJECT_HPSJ,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
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
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'ennov.praxysante.fr': {
    host: import.meta.env.VITE_HOST_ENNOV,
    name: 'Chat bot Ennov',
    project: import.meta.env.VITE_PROJECT_ENNOV,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
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
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'ccib.praxy.ai': {
    host: import.meta.env.VITE_HOST_CCIB,
    name: 'Chat bot CCIB',
    project: import.meta.env.VITE_PROJECT_CCIB,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
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
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: true,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'deuxiemeavis.praxysante.fr': {
    host: import.meta.env.VITE_HOST_DA,
    name: 'Chatbot deuxiemeavis.fr',
    project: import.meta.env.VITE_PROJECT_DA,
    logo: {
      urlImg: './LOGO-DAFR-2023-COLOR-DARK.png',
      width: 16,
      height: 12,
    },
    title: 'deuxiemeavis.fr',
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
    ],
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'montecarlojointrepair.praxysante.fr': {
    host: import.meta.env.VITE_HOST_MCJR,
    name: 'Chat bot Monte-Carlo Joint Repair',
    project: import.meta.env.VITE_PROJECT_MCJR,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
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
    options: {
      isReformulateAuto: false,
      displayDocument: false,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: true,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'hfar.praxysante.fr': {
    host: import.meta.env.VITE_HOST_HFAR,
    name: 'Chat bot Hôpital Fondation Rothschild',
    project: import.meta.env.VITE_PROJECT_HFAR,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
    },
    title: "l'Hôpital Fondation Rothschild",
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
    ],
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'cms.praxysante.fr': {
    host: import.meta.env.VITE_HOST_CMS,
    name: 'Chat bot de la clinique CMS',
    project: import.meta.env.VITE_PROJECT_CMS,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
    },
    title: 'CMS',
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
    ],
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'centre-iridis.praxysante.fr': {
    host: import.meta.env.VITE_HOST_IRIDIS,
    name: 'Chat bot du centre IRIDIS',
    project: import.meta.env.VITE_PROJECT_IRIDIS,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
    },
    title: 'IRIDIS',
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
    ],
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  'dermomedicalcenter.praxysante.fr': {
    host: import.meta.env.VITE_HOST_DERMO,
    name: 'Chat bot du centre DermoMedicalCenter',
    project: import.meta.env.VITE_PROJECT_DERMO,
    logo: {
      urlImg: './logo-dermomedicalcenter.png',
      width: 12,
      height: 12,
    },
    title: 'DermoMedicalCenter',
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
    ],
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
    'essai-clinique.praxysante.fr': {
    host: import.meta.env.VITE_HOST_BEONEMED,
    name: 'Chat bot de Be One medicines',
    project: import.meta.env.VITE_PROJECT_BEONEMED,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
    },
    title: 'BEONEMED',
    languages: [
      {
        id: 'fr',
        name: 'Français',
        icon: '🇫🇷',
      },
    ],
    options: {
      isReformulateAuto: false,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: false,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
  localhost: {
    host: import.meta.env.VITE_HOST_DEV,
    name: `Chat bot test sur project ${import.meta.env.VITE_PROJECT_DEV}`,
    project: import.meta.env.VITE_PROJECT_DEV,
    logo: {
      urlImg: './bot-test.png',
      width: 12,
      height: 12,
    },
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
    options: {
      isReformulateAuto: true,
      displayDocument: true,
      authAccountOption: false,
      sideBarOption: false,
      menuParameterOption: true,
      audioParameterOption: false,
      RecaptchaOption: false,
    },
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
  },
};
