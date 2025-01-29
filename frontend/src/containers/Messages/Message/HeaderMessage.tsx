
type HeaderMessageType = {
  role: string;
  date: string;
};

export default function HeaderMeassage({ role, date }: HeaderMessageType) {
  return (
      <span className={`message-header ${role}`}>
        {role} - {date}
      </span>
  );
}
