import Auth from '../Auth/Auth';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../../hooks/UseLanguage';

export default function Header() {
  // Init Component
  // Check selected language
  const { isSelectLanguage } = useLanguage();
  // Check user is authenticated
  const { isAuthenticated } = useAuth0();

  return (
    <div id="header-language">
      {/* Login/Logout selection */}
      {isSelectLanguage ? !isAuthenticated ? <Auth /> : null : null}
    </div>
  );
}
