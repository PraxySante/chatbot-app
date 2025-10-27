import { useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import SeparateLine from '../../components/SeparateLine/SeparateLine';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import InputEvaluate from '../InputEvaluate/InputEvaluate';
import TransformMarkDownToMessage from '../Messages/Message/TransformMarkDownToMessage';
import { useChat } from '../../hooks/ChatProvider';
import { PLACEHOLDER_COMMENTS, PLACEHOLDER_FEEDBACK } from '../../constants/feeback';

export default function Feedback() {
  //Init Component
  // Check selected language by user
  const { userLanguage } = useLanguage();
  const { sendFeedback,setVoteUser } = useChat();

  // Using Hook State to contain comment
  const [comment, setComment] = useState<string>('');

  // Function to get all data from feedback and including in containerFeedback
  function getDataForm(value: number) {
    setVoteUser(value);
  }

  // Function Get all comment from user
  function getComment(e: any): void {
    setComment(e.target.value);
  }

  // Function to send Feedback form
  async function onSubmit(): Promise<void> {
    await sendFeedback(comment);
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
            content={PLACEHOLDER_FEEDBACK}
          />

          <TransformMarkDownToMessage
            id={'comment'}
            content={userLanguage?.feedback_comments}
          />

          {/* Input Comment */}
          <Input
            variant="textarea"
            onChange={(e) => getComment(e)}
            content={PLACEHOLDER_COMMENTS}
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
