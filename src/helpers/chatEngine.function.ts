import OpenAI from 'openai';

interface IChatBot {
  content: string;
  //updateMessageInRealTime: (text: string) => void;
}

 // Generate a client and connect to OpenAI
 // ! Solution not allowed according to doc OPEN AI -> ngerouslyAllowBrowser
 const client = new OpenAI({
   baseURL: import.meta.env.VITE_MIXTRAL_API_BASE,
   apiKey: import.meta.env.VITE_OPEN_API_KEY,
   dangerouslyAllowBrowser: true,
 })
 // Function to sending message to chat bot
 // ! Generic Chat bot
 async function sendMessageToChatBot({ content }: IChatBot) {
   try {
     const response = await client.chat.completions.create({
       model: import.meta.env.VITE_MIXTRAL_MODEL_NAME,
       temperature: 0,
       messages: [
         {
           role: 'user',
           content: content,
         },
       ],
     });
     return { name: 'bot', message: response.choices[0].message.content };
   } catch (error) {
     console.error(error);
   }
 }

// async function sendMessageToChatBot({ content }: IChatBot) {
//   try {
//     const response = await axiosOpenAI.post('/chat/completions', {
//       role: 'user',
//       content: content,
//     });
//     return { name: 'bot', message: response.data.choices[0].message.content };
//   } catch (error) {
//     console.error(error);
//   }
// }

export { sendMessageToChatBot };
