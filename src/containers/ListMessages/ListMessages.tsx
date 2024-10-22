import { IListMessages } from '../../types/messages/messages.interface';
import { MessageAttributes } from '../../types/messages/messages.type';
import InputMessage from '../InputMessage/InputMessage';
import Message from '../Message/Message';

export default function ListMessages({ messages, getMessage }: IListMessages) {
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
        {/* Including Input  */}
        <InputMessage getMessage={getMessage} />
      </div>
    </>
  );
}
