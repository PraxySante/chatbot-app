import Button from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Input';
import { useLanguage } from '../../hooks/UseLanguage';
import { IModalContent } from '../../types/modal/modal.interface';

export default function ModalContent({
  getComment,
  onSubmit,
  comment,
}: IModalContent) {
  const { userLanguage } = useLanguage();
  return (
    <>
      <div className="p-4 md:p-5">
        <form className="space-y-4 w-full" action="#">
          <Input
            variant={'textarea'}
            className={
              'flex w-full h-20 border border-solid border-primary rounded-lg'
            }
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
