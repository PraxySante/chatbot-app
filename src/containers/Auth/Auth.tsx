import Button from '../../components/Buttons/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../../hooks/UseLanguage';
import Description from '../../components/Text/Description';

export default function Auth() {
  // Init Component
  // Check all variables from useAuth0
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  // Check selected language by user
  const { userLanguage } = useLanguage();

  return (
    <>
      <Description
        content={userLanguage ? userLanguage?.chat_login_message : ''}
        tag={'p'}
        className={''}
      />
      {/*Button Login/Logout*/}
      {!isLoading ? (
        <Button
          content={isAuthenticated ? 'Logout' : 'Login'}
          type={'button'}
          onClick={loginWithRedirect}
        ></Button>
      ) : (
        <Button
          content={'...Loading'}
          type={'button'}
          onClick={() => console.log('loading')}
        ></Button>
      )}
    </>
  );
}
