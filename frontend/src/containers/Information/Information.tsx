import { useState } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useLanguage } from '../../hooks/UseLanguage';
import Description from '../../components/Text/Description';

export default function Information() {
  //Init Component
  // Check selected language by user
  const { userLanguage } = useLanguage();
  // Check Open/Close data information, default is false
  const [isOpenInformation, setIsOpenInformation] = useState<boolean>(false);

  // Function switch Open/close
  function toggleOpenCloseInfomation() {
    setIsOpenInformation(!isOpenInformation);
  }

  return (
    <>
      {/* Title */}
      {/* <h1>{userLanguage?.chat_title}</h1> */}
      {/* Button Open/Close data information */}
      <section className="chat-information" onClick={toggleOpenCloseInfomation}>
        <span className="flex gap-1">
          <IconButton
            icon={!isOpenInformation ? icons?.reduceText : icons?.showText}
            onClick={toggleOpenCloseInfomation}
          />
          ℹ️ {userLanguage?.chat_info}
        </span>
        <Description
          content={userLanguage ? userLanguage?.chat_warning : ''}
          className={isOpenInformation ? 'chat-info' : 'chat-info-hidden'}
          tag={'p'}
        />
      </section>
      {/* Information chat */}
    </>
  );
}
