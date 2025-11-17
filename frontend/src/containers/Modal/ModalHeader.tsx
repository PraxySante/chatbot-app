import IconButton from '../../components/Buttons/IconButton';
import Title from '../../components/Text/Title';
import { useLanguage } from '../../hooks/UseLanguage';

interface IModalHeader {
  closeModal: () => void;
}

export default function ModalHeader({ closeModal }: IModalHeader) {
  const { userLanguage } = useLanguage();
  return (
    <div className="flex w-full items-center justify-between p-4 md:p-5 border-b rounded-t">
      <Title
        content={userLanguage ? userLanguage?.feedback_title_modal : ''}
        tag={'h3'}
        className={'text-xl font-semibold text-black'}
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
