import { useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import Description from '../../components/Text/Description';
import icons from '../../constants/icons';
import { MessageAttributes } from '../../types/messages/messages.type';

export default function Message({
  id,
  content,
  role,
  date,
}: MessageAttributes) {
  useEffect(() => {
    renderingMessage();
  }, [role]);

  // Function rendering message according user or bot
  function renderingMessage() {
    return (
      <>
        {/* Render message bot left side - icon and text */}
        {role === 'assistant' ? (
          <article>
            <span className="flex flex-row gap-2">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              <Description
                id={`text-bot-${id}`}
                content={content}
                tag={'p'}
                className={'text--bot'}
              />

            </span>
            <span className="flex flex-row justify-end font-size ml-16">
              <Description
                content={`${name} - ${date}`}
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
                  content={content}
                  tag={'p'}
                  className={'text--user'}
                />
                <IconButton className={'icon icon-user'} icon={icons?.user} />
              </span>
              <span className="flex flex-row justify-start font-size">
                <Description
                  content={`${name} - ${date}`}
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
        role === 'assitant' ? 'message justify-start' : 'message justify-end'
      }
    >
      <div className={role === 'assitant' ? 'message-bot' : 'message-user'}>
        {renderingMessage()}
      </div>
    </article>
  );
}
