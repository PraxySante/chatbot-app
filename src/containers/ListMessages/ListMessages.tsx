import { useEffect, useState } from 'react';
import { IListMessages } from '../../types/messages/messages.interface';
import { MessageAttributes } from '../../types/messages/messages.type';
import InputMessage from '../InputMessage/InputMessage';
import MessageLoading from '../Loading/MessageLoading';
import Message from '../Message/Message';
import Button from '../../components/Buttons/Button';
import { useLanguage } from '../../hooks/UseLanguage';

export default function ListMessages({ messages, getMessage }: IListMessages) {
  const { userLanguage } = useLanguage();
  const [isUserWritten, setIsUserWritten] = useState<boolean>(false);
  const [isBotWritten, setIsBotWritten] = useState<boolean>(false);

  useEffect(() => {}, [setIsUserWritten, setIsBotWritten]);

  function renderLoadingMessage() {
    return (
      <>
        {isUserWritten && <MessageLoading />}
        {isBotWritten && <MessageLoading />}
      </>
    );
  }

  return (
    <>
      <div id="list-messages">
        {/* Render all messages exist */}
        {messages.map((message: MessageAttributes, index: number) => {
          return (
            <Message
              key={index}
              id={message.id}
              message={message.message}
              name={message.name}
            />
          );
        })}

        {renderLoadingMessage()}
        {messages[messages.length-1].name === 'bot' && userLanguage ? (
          <Button
            type={'button'}
            content={userLanguage?.reformulate_button}
            onClick={() => getMessage('user', userLanguage?.reformulate_button)}
          />
        ) : null}

        {/* Including Input  */}
        <InputMessage
          setIsBotWritten={setIsBotWritten}
          setIsUserWritten={setIsUserWritten}
          getMessage={getMessage}
        />
      </div>
    </>
  );
}
