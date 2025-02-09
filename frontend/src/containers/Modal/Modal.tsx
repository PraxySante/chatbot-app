import { Dispatch, SetStateAction, useState } from 'react';
import Input from '../../components/Inputs/Input';
import IconButton from '../../components/Buttons/IconButton';
import Title from '../../components/Text/Title';
import Button from '../../components/Buttons/Button';
import { useChat } from '../../hooks/ChatProvider';

type ModalType = {
  setIsOpenModalFeedback: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({ setIsOpenModalFeedback }: ModalType) {
  const { sendFeedback } = useChat();
  const [comment, setComment] = useState<string>('');

  // Function Get all comment from user
  function getComment(e: any): void {
    setComment(e.target.value);
  }

  function closeModal() {
    setIsOpenModalFeedback(false);
  }

  // Function to send Feedback form
  async function onSubmit(): Promise<void> {
    await sendFeedback(comment);
    setComment('');
    closeModal();
  }
  return (
    <>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white border border-solid border-primary rounded-lg shadow-sm">
          <div className="flex w-full items-center justify-between p-4 md:p-5 border-b rounded-t">
            <Title
              content={'Je donne mon avis'}
              tag={'h3'}
              className={'text-xl font-semibold text-black'}
            />
            <IconButton
              icon={'X'}
              type="button"
              onClick={() => {
                closeModal();
              }}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-primary hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            />
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4 w-full" action="#">
              <Input
                variant={'textarea'}
                className={
                  'flex w-full h-20 border border-solid border-primary justify-center items-start rounded-lg'
                }
                onChange={(e) => getComment(e)}
                content={'Ecrire votre commentaire'}
                value={comment}
              />
              <Button
                type={'button'}
                content={'Envoyer'}
                onClick={() => {
                  onSubmit()
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
