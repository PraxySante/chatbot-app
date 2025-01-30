// import { useState } from 'react';
// import { useLanguage } from '../../hooks/UseLanguage';
// import CheckBox from '../../components/Buttons/CheckBox';
// import { IFrenquentQuestion } from '../../types/feedback/feedback.interface';
// import Title from '../../components/Text/Title';

// export default function FrequentQuestion({ getDataForm }: IFrenquentQuestion) {
//   // Init Component
//   // Check selected language
//   const { userLanguage } = useLanguage();
//   // Check button checkbox is checked default false
//   const [isChecked, setIsChecked] = useState<boolean>(false);

//   // Function Get information if checkbox is checked
//   function checkFrenquentlyQuestion(e: any) {
//     const newValueChecked = e.target.checked;
//     setIsChecked(newValueChecked);
//     getDataForm( value);
//   }
//   return (
//     <>
//       <section id="frequently-question-box">
//         {/* Title */}
//         <Title
//           className="text-wrap"
//           content={`Feedback ${userLanguage!.feedback_scale}`}
//           tag={'h2'}
//         />
//         {/* Checkbox */}
//         <CheckBox
//           className="frequently-question-items"
//           selectedItem={checkFrenquentlyQuestion}
//           groupName={'question-frequently'}
//           content={userLanguage!.feedback_often_asked}
//         />
//       </section>
//     </>
//   );
// }
