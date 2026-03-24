import { Dispatch, SetStateAction, useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import { useChat } from '../../hooks/ChatProvider';
import { iconSmileys } from '../../constants/feeback';
import { useLanguage } from '../../hooks/UseLanguage';
import './FeedBack.css';

type FeedbackLightType = {
  setIsOpenModalFeedback: Dispatch<SetStateAction<boolean>>;
};

export default function FeedbackLight({
  setIsOpenModalFeedback,
}: FeedbackLightType) {
  const { setVoteUser } = useChat();
  const { userLanguage } = useLanguage();

  useEffect(() => {
    renderingFeedbackLight();
  }, []);

  function handleClick(note: number) {
    setIsOpenModalFeedback(true);
    setVoteUser(note);
  }

  function renderingFeedbackLight() {
    return (
      <>
        {iconSmileys.map((icon, index) => {
          return (
            <IconButton
              key={index}
              onClick={() => handleClick(icon.note)}
              icon={icon.icon}
              className={icon.className}
            />
          );
        })}
      </>
    );
  }

  return (
    <span className="feedback-light hover:bg-secondary hover:text-textHover">
      <p className="hidden md:inline">
        {userLanguage ? userLanguage?.btn_feedback_send : ''}
      </p>
      {renderingFeedbackLight()}
    </span>
  );
}
