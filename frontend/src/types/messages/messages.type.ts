export type MessageAttributes = {
  id: number;
  role: string;
  content: string;
  date: string;
  doc_type?: string;
  doc_ref?: string;
  doc_name?: string;
};

export type SourceAttributes = {
  doc_type?: 'doc' | 'url' |'reformulate';
  doc_ref?: string;
  doc_name?: string;
};
