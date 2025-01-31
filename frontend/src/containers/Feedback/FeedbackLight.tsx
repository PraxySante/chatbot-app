import IconButton from '../../components/Buttons/IconButton';
import { useChat } from '../../hooks/ChatProvider';

export default function FeedbackLight() {
  const { sendFeedback } = useChat();

  async function voteFeedback(vote: number) {
    await sendFeedback(vote, '');
  }

  return (
    <span className="text-sm font-normal flex flex-row w-fit gap-2 items-center border rounded-lg border-gray-200 outline ml-1 py-1 px-2">
      <p className='hidden md:inline'>{'Envoyez votre avis'}</p>
      <IconButton
        onClick={() => voteFeedback(0)}
        icon={'🙁'}
        className="text-red-600 outline rounded-xl px-1"
      />
      <IconButton
        onClick={() => voteFeedback(2)}
        icon={'😑'}
        className="text-orange-500 outline rounded-xl px-1"
      />
      <IconButton
        onClick={() => voteFeedback(5)}
        icon={'🙂'}
        className="text-green-500 outline rounded-xl px-1"
      />
    </span>
  );
}
