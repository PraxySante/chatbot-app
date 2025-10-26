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
        setContentClassName(
          'w-full text-white bg-secondary hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        );
        break;
      case 'La réponse ne correspond pas à ma question  😞👎':
        setContentClassName(
          'btn_actions border border-solid border-secondary  hover:bg-secondary hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        );
        break;
      case 'Envoyez votre avis':
        setContentClassName(
          'btn_actions border border-solid border-secondary  hover:bg-secondary hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        );
        break;
      default:
        setContentClassName(
          'btn_actions border border-solid border-secondary whitespace-pre-line'
        );
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
