import axiosDirectus from "../axiosConfiguration/axiosDirectus.service";

 type postDirectusAttributes = {
   user: string;
   date: Date;
   userQuestion: string;
   modelAnswer: string;
   sourcesNodes: string;
   exhaustivity: number;
   accuracy: number;
   hallucinations: number;
   comments: string;
   historic: string[];
   often_asked: string;
 }
 export async function createDirectus({
   user,
   date,
   userQuestion,
   modelAnswer,
   sourcesNodes,
   exhaustivity,
   accuracy,
   hallucinations,
   comments,
   historic,
   often_asked,
 }: postDirectusAttributes) {
   try {
     const reponse = await axiosDirectus.post('/', {
       User_info: user,
       Date: date,
       Asked_question: userQuestion,
       Model_answer: modelAnswer,
       Source_nodes: sourcesNodes,
       Exhaustivity: exhaustivity,
       Accuracy: accuracy,
       Absence_of_hallucinations: hallucinations,
       Comments: comments,
       Historic: historic,
       Question_frequente: often_asked,
     });
   } catch (error) {
     console.error(error);
   }
 }

