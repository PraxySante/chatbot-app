import config from '../../config/config.json';
import SeparateLine from '../../components/SeparateLine/SeparateLine';
import Link from '../../components/Link/Link';
import { Fragment } from 'react/jsx-runtime';
import { IMenu } from '../../types/modal/modal.interface';
import { useChat } from '../../hooks/ChatProvider';

export default function ModalMenu({ setIsOpenModalParameter }: IMenu) {
  //
  const { selectedRestart } = useChat();
  // Function user selection on modal menu
  function onClick(menuItem: string) {
    if (menuItem === 're-run') {
      selectedRestart();
    } else {
      // Switch and open Modal Parameter
      setIsOpenModalParameter({ menuItem: menuItem, isOpen: true });
    }
  }

  return (
    <section id="menu-modal">
      <ul>
        <li className="list-menu-modal">
          {/* Render list modal menu */}
          {config?.modalMenu.map((menu: any, index: number) => {
            return (
              <Fragment key={index}>
                {/* Render link  modal menu */}
                <Link
                  id={menu.id}
                  className="menu-modal-item"
                  key={index}
                  onClick={onClick}
                >
                  {menu.name}
                </Link>
                {/* Render separate line each two links */}
                {index % 2 ? <SeparateLine /> : null}
              </Fragment>
            );
          })}
        </li>
      </ul>
    </section>
  );
}
