import { Dispatch, SetStateAction, useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import { useChat } from '../../hooks/ChatProvider';
import { iconSmileys } from '../../constants/feeback';

type FeedbackLightType = {
  setIsOpenModalFeedback: Dispatch<SetStateAction<boolean>>;
};

export default function FeedbackLight({
  setIsOpenModalFeedback,
}: FeedbackLightType) {

  const { setVoteUser } = useChat();

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
    <span className="feedback-light hover:bg-secondary hover:text-white">
      <p className="hidden md:inline">{'Envoyez votre avis'}</p>
      {renderingFeedbackLight()}
    </span>
  );
}
