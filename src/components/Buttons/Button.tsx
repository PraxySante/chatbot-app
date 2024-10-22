import { useEffect, useState } from 'react';
import { IButton } from '../../types/inputs/inputs.interface';

export default function Button({ type, content, onClick }: IButton) {
  const [contentClassName, setContentClassName] = useState<string>('');

  useEffect(() => {
    switch (content) {
      case 'Login':
        setContentClassName('btn_actions contained');
        break;
      case 'Logout':
        setContentClassName('btn_actions contained');
        break;
      default:
        setContentClassName('btn_actions outlined');
        break;
    }
  }, [content]);

  return (
    <>
      <button className={contentClassName} type={type} onClick={onClick}>
        {content}
      </button>
    </>
  );
}
