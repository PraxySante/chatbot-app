import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import SelectLanguage from '../SelectLanguage/SelectLanguage';

import Description from '../../components/Text/Description';
import Title from '../../components/Text/Title';
import { lazy } from 'react';

const Image = lazy(() => import('../../components/Logo/Logo'));

interface IHeaderAttributes {
  toggleOpenCloseModalMenu: () => void;
}

export default function Header({
  toggleOpenCloseModalMenu,
}: IHeaderAttributes) {
  // Init Component

  return (
    <div id="header">
      {/* Login/Logout selection */}
      {/* {isSelectLanguage ? !isAuthenticated ? <Auth /> : null : null} */}
      {/* Icons */}
      <span className="icons-actions gap-2 items-center left-10">
        <span className="relative">
          <Image imgSource={'./bot.png'} classname="w-14 h-14" />
          <span className="absolute left-1 bottom-0 h-4 w-4 rounded-full bg-green-400"></span>
        </span>

        <span className="flex flex-col h-fit">
          <Title
            content={import.meta.env.VITE_CHATBOT_NAME}
            tag={'h3'}
            className={''}
          />
          <Description
            content={'Réponds généralement immédiatemment...'}
            tag={'p'}
            className={''}
          />
        </span>
      </span>
      <span className="icons-actions right xs:flex xs:flex-col">
        {import.meta.env.VITE_OPT_MENU_PARAMETERS === 'true' && (
          <>
            <SelectLanguage />
            <IconButton
              onClick={toggleOpenCloseModalMenu}
              icon={icons.menuBar}
            />
          </>
        )}
      </span>
    </div>
  );
}
