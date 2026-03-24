import IconButton from '../../components/Buttons/IconButton';
import Title from '../../components/Text/Title';
import { IModalParameterHeader } from '../../types/modal/modal.interface';
import './ModalParameter.css';

export default function ModalParameterHeader({
  closeModal,
}: IModalParameterHeader) {
  return (
    <div className="flex w-full items-center justify-between p-4 md:p-5 border-b rounded-t">
      <Title
        content={'Sélectionner mon microphone'}
        tag={'h3'}
        className={'text-lg font-semibold text-text'}
      />
      <IconButton
        icon={'X'}
        type="button"
        onClick={() => {
          closeModal();
        }}
        className="end-2.5 text-text bg-transparent hover:bg-primary hover:text-textHover rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
      />
    </div>
  );
}
