import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { MessageAttributes } from '../../types/messages/messages.type';

export default function Message({ id, message, name }: MessageAttributes) {
  // Function rendering message according user or bot
  function renderingMessage() {
    return (
      <>
        {/* Render message bot left side - icon and text */}
        {name === 'bot' ? (
          <>
            <IconButton className={'icon-bot'} icon={icons?.bot} />
            <p id={`text-${id}`} className="text">
              {message}
            </p>
          </>
        ) : (
          <>
            {/* Render message user right side - text and icon*/}
            <p id={`text-${id}`} className="text">
              {message}
            </p>
            <IconButton className={'icon-user'} icon={icons?.human} />
          </>
        )}
      </>
    );
  }

  return (
    <article
      className={
        name === 'bot' ? 'message justify-start' : 'message justify-end'
      }
    >
      <div className={name === 'bot' ? 'message-bot' : 'message-user'}>
        {renderingMessage()}
      </div>
    </article>
  );
}
