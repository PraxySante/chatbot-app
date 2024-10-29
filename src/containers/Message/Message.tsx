import { useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import Description from '../../components/Text/Description';
import icons from '../../constants/icons';
import { MessageAttributes } from '../../types/messages/messages.type';

export default function Message({ id, message, name }: MessageAttributes) {
  useEffect(() => {
    renderingMessage();
  }, [name]);

  // Function rendering message according user or bot
  function renderingMessage() {
    return (
      <>
        {/* Render message bot left side - icon and text */}
        {name === 'bot' ? (
          <article>
            <span className="flex flex-row gap-2">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              <Description
                id={`text-bot-${id}`}
                content={message}
                tag={'p'}
                className={'text--bot'}
              />
            </span>
            <span className="flex flex-row justify-end font-size ml-16">
              <Description
                content={`${name} - 28 Oct, 2023`}
                tag={'p'}
                className={'text-xs'}
              />
            </span>
          </article>
        ) : (
          <>
            {/* Render message user right side - text and icon*/}
            <article>
              <span className="flex flex-row gap-2 justify-end">
                <Description
                  id={`text-user-${id}`}
                  content={message}
                  tag={'p'}
                  className={'text--user'}
                />
                <IconButton className={'icon icon-user'} icon={icons?.user} />
              </span>
              <span className="flex flex-row justify-start font-size">
                <Description
                  content={`${name} - 28 Oct, 2023`}
                  tag={'p'}
                  className={'text-xs'}
                />
              </span>
            </article>
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
