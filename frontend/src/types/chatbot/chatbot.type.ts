export type PingType = {
  ping: string;
};

export type MessageType = {
  role: string;
  content: string;
};

export type SourceType = {
  doc_type: string;
  doc_ref: string;
  doc_name: string;
};

export type ResponseStartEndType = {
  message: MessageType;
};

export type MessageHistoryType = {
  history: MessageType[];
  message: MessageType;
};

export type ResponseMessageType = {
  message: MessageType;
  sources: SourceType[];
};

export type ReponseReformulationType = {
  reformulations: MessageType[];
};

export type ReponseFailureType = {
  message: string;
  details: string;
};
