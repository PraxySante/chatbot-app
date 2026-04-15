import { useEffect, useState } from 'react';
import { IButton } from '../../types/inputs/inputs.interface';

export default function Button({ type, content, onClick, children }: IButton) {
  const [contentClassName, setContentClassName] = useState<string>('');

  useEffect(() => {
    switch (content) {
      case 'Login':
        setContentClassName('btn_actions contained');
        break;
      case 'Logout':
        setContentClassName('btn_actions contained');
        break;
      case 'Envoyer':
        setContentClassName('btn_actions send_btn');
        break;
      case 'La réponse ne correspond pas à ma question  😞👎':
        setContentClassName('btn_actions reformulate_btn');
        break;
      case 'Envoyez votre avis':
        setContentClassName('btn_actions feedback_btn');
        break;
      default:
        setContentClassName('btn_actions default_btn');
        break;
    }
  }, [content]);

  return (
    <>
      <button className={contentClassName} type={type} onClick={onClick}>
        {content}
        {children}
      </button>
    </>
  );
}
