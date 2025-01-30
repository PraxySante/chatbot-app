import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useLanguage } from '../../hooks/UseLanguage';
import { feedbackApiFrontChatBot } from '../../services/ChatBot/feedbackApiFrontChatBot.service';

export default function FeedbackLight() {
  const { userLanguage } = useLanguage();

  async function voteFeedback(vote: number) {
    await feedbackApiFrontChatBot(vote);
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
