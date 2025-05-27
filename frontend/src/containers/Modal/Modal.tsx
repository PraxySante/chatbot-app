import { useState } from 'react';
import { useChat } from '../../hooks/ChatProvider';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import { ModalType } from '../../types/modal/modal.type';

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
          <ModalHeader closeModal={closeModal} />
          <ModalContent
            getComment={getComment}
            onSubmit={onSubmit}
            comment={comment}
          />
        </div>
      </div>
    </>
  );
}
