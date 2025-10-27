import Button from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Input';
import { PLACEHOLDER_COMMENTS } from '../../constants/feeback';
import { IModalContent } from '../../types/modal/modal.interface';

export default function ModalContent({getComment, onSubmit,comment}:IModalContent) {
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
            content={PLACEHOLDER_COMMENTS}
            value={comment}
          />
          <Button
            type={'button'}
            content={'Envoyer'}
            onClick={() => {
              onSubmit();
            }}
          />
        </form>
      </div>
    </>
  );
}
