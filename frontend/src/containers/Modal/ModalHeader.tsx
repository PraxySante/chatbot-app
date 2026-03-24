import IconButton from '../../components/Buttons/IconButton';
import Title from '../../components/Text/Title';
import { useLanguage } from '../../hooks/UseLanguage';
import './Modal.css';

interface IModalHeader {
  closeModal: () => void;
}

export default function ModalHeader({ closeModal }: IModalHeader) {
  const { userLanguage } = useLanguage();
  return (
    <div className="modal_header-containers">
      <Title
        content={userLanguage ? userLanguage?.feedback_title_modal : ''}
        tag={'h3'}
        className={'modal_header-title'}
      />
      <IconButton
        icon={'X'}
        type="button"
        onClick={closeModal}
        className="modal-close"
      />
    </div>
  );
}
