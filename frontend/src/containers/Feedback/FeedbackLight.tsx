import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useChat } from '../../hooks/ChatProvider';
import { useLanguage } from '../../hooks/UseLanguage';

export default function FeedbackLight() {
  const { userLanguage } = useLanguage();
  const { sendFeedback } = useChat();

  async function voteFeedback(vote: number) {
    await sendFeedback(vote, '');
  }

  return (
    <span className="text-sm font-normal flex flex-row w-fit gap-1 items-center border rounded-lg border-gray-200 outline ml-1 p-2">
      {userLanguage?.feedback_send}
      <IconButton
        onClick={() => voteFeedback(0)}
        icon={icons?.thumbdown}
        className="text-red-600 border-black-200 outline rounded-xl p-[1px]"
      />
      <IconButton
        onClick={() => voteFeedback(2)}
        icon={icons?.neutral}
        className="border-black-200 outline rounded-xl p-[1px]"
      />
      <IconButton
        onClick={() => voteFeedback(5)}
        icon={icons?.thumbup}
        className="text-third border-black-200 outline rounded-xl p-[1px]"
      />
    </span>
  );
}
