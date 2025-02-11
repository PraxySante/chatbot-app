import { Dispatch, SetStateAction, useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import { useChat } from '../../hooks/ChatProvider';

type FeedbackLightType = {
  setIsOpenModalFeedback: Dispatch<SetStateAction<boolean>>;
};

export default function FeedbackLight({
  setIsOpenModalFeedback,
}: FeedbackLightType) {
  const iconSmileys = [
    {
      id: 'sad',
      icon: '🙁',
      className: 'text-red-600 outline rounded-xl px-1',
      note: 0,
    },
    {
      id: 'mediocre',
      icon: '😑',
      className: 'text-orange-500 outline rounded-xl px-1',
      note: 2,
    },
    {
      id: 'good',
      icon: '🙂',
      className: 'text-green-500 outline rounded-xl px-1',
      note: 5,
    },
  ];
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
    <span className="text-sm font-normal flex flex-row w-fit gap-2 items-center border rounded-lg border border-solid border-secondary ml-1 py-1 px-2">
      <p className="hidden md:inline">{'Envoyez votre avis'}</p>
      {renderingFeedbackLight()}
    </span>
  );
}
