import Button from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Input';
import { useLanguage } from '../../hooks/UseLanguage';
import { IModalContent } from '../../types/modal/modal.interface';
import './Modal.css';

export default function ModalContent({
  getComment,
  onSubmit,
  comment,
}: IModalContent) {
  const { userLanguage } = useLanguage();
  return (
    <>
      <div className="modal_content-containers">
        <form className="space-y-4 w-full" action="#">
          <Input
            variant={'textarea'}
            className={'modal_content-input'}
            onChange={(e) => getComment(e)}
            content={userLanguage?.placeholder_feedback_comments}
            value={comment}
          />
          <Button
            type={'button'}
            content={userLanguage ? userLanguage?.btn_chat_send : ''}
            onClick={() => {
              onSubmit();
            }}
          />
        </form>
      </div>
    </>
  );
}
