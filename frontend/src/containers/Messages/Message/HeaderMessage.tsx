import { ROLE_USER, ROLE_UTILISATEUR } from "../../../constants/chat.constants";
import { HeaderMessageType } from "../../../types/messages/messages.type";

export default function HeaderMeassage({ role, date }: HeaderMessageType) {
  return (
    <span className={`message-header ${role}`}>
      {role === ROLE_USER ? ROLE_UTILISATEUR : role} - {date}
    </span>
  );
}
