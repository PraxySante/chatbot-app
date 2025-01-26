import { useEffect, useState } from 'react';
import { IIconButton } from '../../types/inputs/inputs.interface';

export default function IconButton({
  type,
  disabled,
  className,
  icon,
  onClick,
}: IIconButton) {
  const [formatClassName, setFormatClassName] = useState<string>('');

  useEffect(() => {
    if (className) {
      setFormatClassName(className);
    } else {
      setFormatClassName('');
    }
  }, []);

  return (
    <>
      <button
        disabled={disabled}
        className={formatClassName}
        type={type}
        onClick={onClick}
      >
        {icon}
      </button>
    </>
  );
}
