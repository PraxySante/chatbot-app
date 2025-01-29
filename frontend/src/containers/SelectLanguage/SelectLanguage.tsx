import config from '../../config/config.json';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../../hooks/UseLanguage';
import { LanguageAttributes } from '../../types/languages/languages.config.type';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useEffect, useState } from 'react';
import Description from '../../components/Text/Description';

export default function SelectLanguage() {
  // useLanguage from LanguageContext to introduce function and get user choice
  const { selectLanguage, selectedLanguage } = useLanguage();
  const [isOpenModalLanguage, setIsOpenModalLanguage] =
    useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    renderIconButtonLanguage;
  }, [selectedLanguage]);

  function openCloseModalLanguage() {
    setIsOpenModalLanguage(!isOpenModalLanguage);
  }

  // function to select which language has been chosen
  function selectedItem(selectedUserLanguage: string) {
    selectLanguage(selectedUserLanguage);
    if (isAuthenticated && selectedLanguage !== selectedUserLanguage) {
      logout({
        logoutParams: { returnTo: import.meta.env.VITE_AUTH0_DOMAIN_CALLBACK },
      });
    }
  }

  function renderIconButtonLanguage() {
    return <IconButton icon={icons[(selectedLanguage as 'fr') || 'nl']} />;
  }

  return (
    <>
      <div className="flex right-10 w-fit gap-2 px-2 border border-solid border-slate-200 rounded-lg bg-white">
        <IconButton
          icon={!isOpenModalLanguage ? icons?.showText : icons?.reduceText}
          onClick={openCloseModalLanguage}
        />
        {renderIconButtonLanguage()}
      </div>
      {isOpenModalLanguage ? (
        <section className="absolute -left-16 mt-12 bg-white w-fit h-fit border border-solid border-slate-200 rounded-lg flex flex-col w-fit h-fit p-2 gap-2">
          {config?.languages.map(
            (language: LanguageAttributes, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center gap-2"
                  onClick={openCloseModalLanguage}
                >
                  <IconButton
                    onClick={() => selectedItem(language.id)}
                    icon={icons[(language?.id as 'fr') || 'nl']}
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
