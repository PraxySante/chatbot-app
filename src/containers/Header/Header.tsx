import SeparateLine from '../../components/SeparateLine/SeparateLine';
import Auth from '../Auth/Auth';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../../hooks/UseLanguage';
import SelectLanguage from '../SelectLanguage/SelectLanguage';

export default function Header() {
  // Init Component
  // Check selected language
  const { isSelectLanguage } = useLanguage();
  // Check user is authenticated
  const { isAuthenticated } = useAuth0();

  return (
    <div id="header-language">
      {/* Language selection */}
      <SelectLanguage />
      <SeparateLine />
      {/* Login/Logout selection */}
      {isSelectLanguage ? !isAuthenticated ? <Auth /> : null : null}
    </div>
  );
}
