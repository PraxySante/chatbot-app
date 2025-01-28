import { useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import Description from '../../components/Text/Description';
import icons from '../../constants/icons';
import { MessageAttributes } from '../../types/messages/messages.type';
import TransformMarkDownToMessage from './TransformMarkDownToMessage';

export default function Message({
  id,
  content,
  role,
  date,
}: MessageAttributes) {
  useEffect(() => {
    renderingMessage();
  }, [content]);

  // Function rendering message according user or bot
  function renderingMessage() {
    return (
      <>
        {/* Render message bot left side - icon and text */}
        {role === "assistant" ? (
          <article>
            <span className="flex flex-row justify-start gap-2">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              <TransformMarkDownToMessage
                id={`text-bot-${id}`}
                content={content}
                className={'text--bot'}
              />
            </span>
            <span className="flex flex-row justify-end font-size ml-16">
              <Description
                content={`${role} - ${date}`}
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
                <TransformMarkDownToMessage
                  id={`text-user-${id}`}
                  content={content}
                  className={'text--user'}
                />

                <IconButton className={'icon icon-user'} icon={icons?.user} />
              </span>
              <span className="flex flex-row justify-start font-size">
                <Description
                  content={`${role} - ${date}`}
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
    <section
      className={
        role === 'assistant' ? 'message justify-start' : 'message justify-end'
      }
    >
      <div className={role === 'assitant' ? 'message-bot' : 'message-user'}>
        {renderingMessage()}
      </div>
    </section>
  );
}
