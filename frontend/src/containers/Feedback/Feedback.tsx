import { useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import SeparateLine from '../../components/SeparateLine/SeparateLine';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import InputEvaluate from '../InputEvaluate/InputEvaluate';
import TransformMarkDownToMessage from '../Messages/Message/TransformMarkDownToMessage';
import { useChat } from '../../hooks/ChatProvider';

export default function Feedback() {
  //Init Component
  // Check selected language by user
  const { userLanguage } = useLanguage();
  const { sendFeedback } = useChat();

  // Using Hook State to contain comment
  const [comment, setComment] = useState<string>('');
  const [vote, setVote] = useState<number>(0);

  // Function to get all data from feedback and including in containerFeedback
  function getDataForm(value: number) {
    setVote(value);
    // Update useState concerning user selection
    // setContainerFeedback(
    //   (containerFeedback: FeedbackAttributes[] | undefined) => {
    //     // Condition if containerFeedback exists
    //     if (containerFeedback) {
    //       // Searching if Feedback already added
    //       // ! foundIndex = -1 not exists / 0 : exists
    //       const foundIndex = containerFeedback.findIndex(
    //         (container: FeedbackAttributes) => {
    //           // Returning all data
    //           return container.id === id;
    //         }
    //       );
    //       if (foundIndex !== -1) {
    //         // Get all data from found Feedback
    //         const updatedFeedback = [...containerFeedback];
    //         // Updating Feedback if already added
    //         updatedFeedback[foundIndex].value = value;
    //         // Return Feedback updated
    //         return updatedFeedback;
    //       } else {
    //         // Adding new Feedback with all data (id and value)
    //         return [...containerFeedback, { id, value }];
    //       }
    //     }
    //   }
    // );
  }

  // Function Get all comment from user
  function getComment(e: any): void {
    setComment(e.target.value);
  }

  // Function to send Feedback form
  async function onSubmit(): Promise<void> {
    await sendFeedback(vote, comment);
    setComment('');
  }

  return (
    <>
      {userLanguage ? (
        <div id="form">
          {/* Separatline */}
          <SeparateLine />

          <InputEvaluate
            id={'feedback'}
            getDataForm={(value) => getDataForm(value)}
            content={'Feedback'}
          />

          <TransformMarkDownToMessage
            id={'comment'}
            content={userLanguage?.feedback_comments}
          />

          {/* Input Comment */}
          <Input
            variant="text"
            onChange={(e) => getComment(e)}
            content={'Ecrire votre commentaire'}
            value={comment}
          />
          {/* Button Feedback Form */}
          <Button
            type="button"
            content={userLanguage?.feedback_send}
            onClick={onSubmit}
          />
        </div>
      ) : null}
    </>
  );
}
