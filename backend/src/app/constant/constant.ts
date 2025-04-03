export const ONE_HOUR = 60 * 60;
export const KEY_EXIST = 1;
export const MAX_REQUEST_PER_MINUTE = 8;
export const ONE_MINUTE = 60;

export const MILLISECONDS = 1000;

export const RESTART = "restart";
export const USER = "user";
export const BEARER = "Bearer";
export const ASSISTANT = "assistant";

// FAILURE
export const FAILURE_MESSAGE = "Failure";
export const FAILURE_MISSING_IP_HEADERS = "Missing ip in request headers.";

export const FAILURE_STORED_CACHE = "Stored cache not found for ip";
export const FAILURE_TOKEN_EXPIRED = "Token expired";

export const FAILURE_COLLECTION_MESSAGE = "Erreur : Collection non définie";

export const FAILURE_REDIS_MESSAGE = "Failed to connect to Redis";

// ERROR
export const ERROR_REDIS_MESSAGE = "Redis Client Error";

export const ERROR_BAD_REQUEST = 400;
export const ERROR_BAD_REQUEST_MESSSAGE =
	"Bad request, missing project or language.";

export const ERROR_NOT_AUTHENTIFIED = 401;
export const ERROR_NOT_AUTHENTIFIED_MESSSAGE = "Not Authentified.";

export const ERROR_NOT_FOUND = 404;
export const ERROR_NOT_FOUND_MESSAGE = "Ressource not found.";

export const ERROR_TOO_MANY_REQUEST = 429;
export const ERROR_TOO_MANY_REQUEST_MESSAGE =
	"Too many requests. Please try again later.";

export const ERROR_SERVER = 500;
export const ERROR_SERVER_MESSAGE = "Internal Server Error";
export const ERROR_DATABASE_MESSAGE = "System Error Database";

// SUCCESS
export const SUCCESS_OK = 200;
export const SUCCESS_OK_MESSAGE = "Success connection";
export const SUCCESS_MESSAGE = "success";
