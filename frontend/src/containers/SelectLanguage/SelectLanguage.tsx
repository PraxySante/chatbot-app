import { useLanguage } from '../../hooks/UseLanguage';
import { LanguageAttributes } from '../../types/languages/languages.config.type';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useEffect, useState } from 'react';
import Description from '../../components/Text/Description';
import { useClient } from '../../hooks/ClientProvider';
import { useNotification } from '../../hooks/NotificationProvider';
import { useChat } from '../../hooks/ChatProvider';
import './SelectedLanguage.css';

type Language = 'en' | 'ar' | 'fr';

export default function SelectLanguage() {
  // useLanguage from LanguageContext to introduce function and get user choice
  const { setSelectLanguage, selectedLanguage } = useLanguage();
  const { getMessageToNotification } = useNotification();
  const [isOpenModalLanguage, setIsOpenModalLanguage] =
    useState<boolean>(false);

  const { configClient } = useClient();
  const { selectedRestart } = useChat();

  useEffect(() => {
    renderIconButtonLanguage;
  }, [selectedLanguage]);

  function openCloseModalLanguage() {
    setIsOpenModalLanguage(!isOpenModalLanguage);
  }

  // function to select which language has been chosen
  function selectedItem(selectedUserLanguage: string) {
    if (selectedUserLanguage === 'ar') {
      getMessageToNotification(
        401,
        'This language will be integated into next version. Please select english version.'
      );
      return;
    }
    setSelectLanguage(selectedUserLanguage);
    selectedRestart(selectedUserLanguage);
    setIsOpenModalLanguage(!isOpenModalLanguage);
  }

  function renderIconButtonLanguage() {
    return <IconButton icon={icons[selectedLanguage as Language]} />;
  }

  return (
    <>
      <div className="language-container_box" onClick={openCloseModalLanguage}>
        <IconButton
          icon={!isOpenModalLanguage ? icons.showText : icons.reduceText}
        />
        {renderIconButtonLanguage()}
      </div>
      {isOpenModalLanguage ? (
        <section className="language-container_select">
          {configClient.languages.map(
            (language: LanguageAttributes, index: number) => {
              return (
                <div
                  key={index}
                  className="language-container_flag"
                  onClick={() => selectedItem(language.id)}
                >
                  <IconButton icon={icons[(language?.id as 'en') || 'ar']} />
                  <Description
                    content={language ? language?.name : ''}
                    tag={'p'}
                    className={''}
                  />
                </div>
              );
            }
          )}
        </section>
      ) : null}
    </>
  );
}
