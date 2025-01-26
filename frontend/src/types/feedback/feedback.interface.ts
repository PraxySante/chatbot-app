import { FeedbackAttributes } from "./feedback.type";

export type IFrenquentQuestion = {
  getDataForm: ({ id, value }: FeedbackAttributes) => void;
};