import { ROLE_USER } from '../../../constants/chat.constants';
import { useLanguage } from '../../../hooks/UseLanguage';
import { HeaderMessageType } from '../../../types/messages/messages.type';

export default function HeaderMeassage({ role, date }: HeaderMessageType) {
  const { userLanguage } = useLanguage();
  return (
    <span className={`message-header ${role}`}>
      {role === ROLE_USER ? userLanguage?.chat_user : role} - {date}
    </span>
  );
}
