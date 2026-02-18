import { useLanguage } from '../../hooks/UseLanguage';
import { LanguageAttributes } from '../../types/languages/languages.config.type';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useEffect, useState } from 'react';
import Description from '../../components/Text/Description';
import { useClient } from '../../hooks/ClientProvider';
import { useNotification } from '../../hooks/NotificationProvider';
import { useChat } from '../../hooks/ChatProvider';

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
  }

  function renderIconButtonLanguage() {
    return <IconButton icon={icons[selectedLanguage as Language]} />;
  }

  return (
    <>
      <div className="flex right-10 w-fit gap-2 px-2 border border-solid border-slate-200 rounded-lg bg-white">
        <IconButton
          icon={!isOpenModalLanguage ? icons.showText : icons.reduceText}
          onClick={openCloseModalLanguage}
        />
        {renderIconButtonLanguage()}
      </div>
      {isOpenModalLanguage ? (
        <section className="absolute -left-16 mt-12 bg-white w-fit h-fit border border-solid border-slate-200 rounded-lg flex flex-col w-fit h-fit p-2 gap-2">
          {configClient.languages.map(
            (language: LanguageAttributes, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center gap-2"
                  onClick={openCloseModalLanguage}
                >
                  <IconButton
                    onClick={() => selectedItem(language.id)}
                    icon={icons[(language?.id as 'en') || 'ar']}
                  />
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
