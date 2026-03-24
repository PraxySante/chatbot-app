import { useAuth0 } from '@auth0/auth0-react';
import SeparateLine from '../../components/SeparateLine/SeparateLine';
import { useLanguage } from '../../hooks/UseLanguage';
import './StatutLogin.css'

export default function StatutLogin() {
  //Init Component
  // Check selected language by user
  const { isSelectLanguage, userLanguage } = useLanguage();
  // Check user authentified
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div id="statut-login">
        {isSelectLanguage ? (
          <>
            <SeparateLine />
            <h3>{userLanguage?.connection_status}</h3>
            {isAuthenticated
              ? userLanguage?.connection_connected + '🌐'
              : userLanguage?.connection_disconnected + '⏸'}
            <SeparateLine />
          </>
        ) : null}
      </div>
    </>
  );
}
