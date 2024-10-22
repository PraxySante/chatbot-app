import { useEffect, useState } from 'react';
import { IParameterModal } from '../../types/modal/modal.interface';


export default function ModalParameter({
  setIsOpenModalParameterItem,
  isOpenModalParameterItem,
}: IParameterModal) {

  // Init component
  // Hook state check Open/Close Modal Session default is false
  const [isOpenModalSession, setIsOpenModalSession] = useState<boolean>(false);

  // Hook init state to ModalSession
  useEffect(() => {
    setIsOpenModalSession(isOpenModalParameterItem.isOpen);
    console.log(isOpenModalSession)
  }, []);

  // Function Close Modal action
  function closeModal() {
    setIsOpenModalSession(!isOpenModalParameterItem.isOpen);
    setIsOpenModalParameterItem({
      menuItem: isOpenModalParameterItem?.menuItem,
      isOpen: false,
    });
  }

  return (
    <div id="modal-parameter-background" onClick={closeModal}>
      <div className="modal-parameter"></div>
    </div>
  );
}
