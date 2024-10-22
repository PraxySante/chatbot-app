import { Fragment } from 'react/jsx-runtime';
import config from '../../config/config.json';
import { useAuth0 } from '@auth0/auth0-react';
import ButtonRadio from '../../components/Buttons/ButtonRadio';
import { useLanguage } from '../../hooks/UseLanguage';
import { LanguageAttributes } from '../../types/languages/languages.config.type';

export default function SelectLanguage() {
  // useLanguage from LanguageContext to introduce function and get user choice
  const { selectLanguage, selectedLanguage } = useLanguage();
  const { isAuthenticated, logout } = useAuth0();

  // function to select which language has been chosen
  function selectedItem(selectedUserLanguage: string) {
    if (isAuthenticated && selectedLanguage !== selectedUserLanguage) {
      logout({
        logoutParams: { returnTo: import.meta.env.VITE_AUTH0_DOMAIN_CALLBACK },
      });
    }
    selectLanguage(selectedUserLanguage);
  }

  return (
    <div className="box-language">
      <h2>Langue | Taal 🌍</h2>
      <li className="box-language-list">
        {/* Render each language include into configuration */}
        {config?.languages.map(
          (language: LanguageAttributes, index: number) => {
            return (
              <Fragment key={index}>
                <ul>
                  {/* Render button each language  */}
                  <ButtonRadio
                    selectedLanguage={selectedLanguage}
                    groupName="language"
                    language={language}
                    selectedItem={(selectedUserLanguage) => {
                      selectedItem(selectedUserLanguage);
                    }}
                  />
                </ul>
              </Fragment>
            );
          }
        )}
      </li>
    </div>
  );
}
