export const STATUS_SUCCESS = 200;

export const SUCCESS_MESSAGE_SESSION = 'Nouvelle session démarrée';
export const SUCCESS_MESSAGE_CONNECTION = 'Success connection';
export const SUCCESS_MESSAGE_REQUEST_DONE = `La requete a bien été réalisé.`
export const SUCCESS_MESSAGE_RECAPTCHA =
  'Vous pouvez désormais utiliser le chatbot.';
export const SUCCESS_MESSAGE_FEEDBACK = 'Feedback envoyé';
export const SUCCESS_MESSAGE_CLOSE_CONNECTION = 'Conversation clôturée';


export const STATUS_ERROR_BAD_REQUEST = 400;
export const STATUS_ERROR_UNAUTHORIZED = 401;
export const STATUS_ERROR_WRONG_WAY = 404;
export const STATUS_ERROR_TOO_MANY_REQUEST = 429;
export const STATUS_ERROR_SERVER = 500;
export const STATUS_ERROR_SERVICE_NOT_AVAILABLE = 503;

export const ERROR_MESSAGE_RECAPTCHA =
  "Veuillez confirmer que vous n'etes pas un robot";
export const ERROR_MESSAGE_REFRESH =
  'Redemarrer une nouvelle session ou contacter un administrateur.';
export const ERROR_MESSAGE_NOT_ENOUGH_CONTENT = `Pas assez de contenus pour donner votre avis.`;
export const ERROR_MESSAGE_TOO_MANY_REQUEST =
  'Trop de requêtes, attendez 1 minute.';
export const ERROR_MESSAGE_WRONG_WAY = `Mauvaise requête, veuillez transmettre votre question.`
export const ERROR_MESSAGE_UNAUTHORIZED = `Session perdue, redemarrer une nouvelle session ou contacter un administrateur.`

export const ERROR_TYPE_FAILURE = 'Failure';

export const ERROR_USE_RECAPTCHA =
  'useRecaptcha was not provided to RecaptchaContextProvider';
export const ERROR_USE_NOTIFICATION =
  'useNotification was not provided to NotificationContextProvider';

export const PANEL_CHAT = 'chat';
export const PANEL_PROCEDURE = 'procedure';
