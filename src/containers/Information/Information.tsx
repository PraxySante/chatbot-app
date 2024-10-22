import { useState } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useLanguage } from '../../hooks/UseLanguage';

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
      <h3>{userLanguage?.chat_title}</h3>
      {/* Button Open/Close data information */}
      <span onClick={toggleOpenCloseInfomation}>
        <IconButton
          icon={isOpenInformation ? icons?.reduceText : icons?.showText}
          onClick={toggleOpenCloseInfomation}
        />
        ℹ️ Information
      </span>
      {/* Information chat */}
      <p className={isOpenInformation ? 'chat-info' : 'chat-info-hidden'}>
        {userLanguage?.chat_warning}
      </p>
    </>
  );
}
