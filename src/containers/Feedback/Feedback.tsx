import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import SeparateLine from '../../components/SeparateLine/SeparateLine';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import config from '../../config/config.json';
import FrequentQuestion from '../FrequentQuestion/FrequentQuestion';
import InputEvaluate from '../InputEvaluate/InputEvaluate';
import { FeedbackAttributes } from '../../types/feedback/feedback.type';

export default function Feedback() {
  //Init Component
  // Check selected language by user
  const { userLanguage } = useLanguage();

  // Using Hook State to contain all data feedback
  const [containerFeedback, setContainerFeedback] = useState<
    FeedbackAttributes[] | undefined
  >([]);
  // Using Hook State to contain comment
  const [comment, setComment] = useState<string>('');

  // Function to get all data from feedback and including in containerFeedback
  function getDataForm({ id, value }: FeedbackAttributes) {
    // Update useState concerning user selection
    setContainerFeedback(
      (containerFeedback: FeedbackAttributes[] | undefined) => {
        // Condition if containerFeedback exists
        if (containerFeedback) {
          // Searching if Feedback already added
          // ! foundIndex = -1 not exists / 0 : exists
          const foundIndex = containerFeedback.findIndex(
            (container: FeedbackAttributes) => {
              // Returning all data
              return container.id === id;
            }
          );
          if (foundIndex !== -1) {
            // Get all data from found Feedback
            const updatedFeedback = [...containerFeedback];
            // Updating Feedback if already added
            updatedFeedback[foundIndex].value = value;
            // Return Feedback updated
            return updatedFeedback;
          } else {
            // Adding new Feedback with all data (id and value)
            return [...containerFeedback, { id, value }];
          }
        }
      }
    );
  }

  // Function Get all comment from user
  function getComment(e: any): void {
    setComment(e.target.value);
  }

  // Function to send Feedback form
  // ! Must finished to connect Directus
  async function onSubmit(): Promise<void> {
    //const test = await axiosConfig.get('/');
    getDataForm({ id: 'comment', value: comment });
    console.log(containerFeedback);
    setContainerFeedback([]);
  }

  return (
    <>
      {userLanguage ? (
        <div id="form">
          {/* Frequently Question Session */}
          <FrequentQuestion
            getDataForm={({ id, value }: FeedbackAttributes) =>
              getDataForm({ id, value })
            }
          />
          {/* Separatline */}
          <SeparateLine />
          {config?.feedback.map((feedback: any, index: number) => {
            return (
              <Fragment key={index}>
                {/* Input Evaluate Feedback */}
                <InputEvaluate
                  id={feedback}
                  getDataForm={({ id, value }) => getDataForm({ id, value })}
                  content={userLanguage[feedback]}
                />
              </Fragment>
            );
          })}
          <p>{userLanguage?.feedback_comments}</p>
          {/* Input Comment */}
          <Input
            variant="text"
            onChange={(e) => getComment(e)}
            content={'Ecrire votre commentaire'}
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
