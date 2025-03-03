import { useEffect, useState } from 'react';
import { IIconButton } from '../../types/inputs/inputs.interface';

export default function IconButton({
  type,
  disabled,
  className,
  icon,
  onClick,
  onMouseDown,
  onMouseLeave,
  onMouseUp,
  content
}: IIconButton) {
  const [formatClassName, setFormatClassName] = useState<string>('');

  useEffect(() => {
    if (className) {
      setFormatClassName(className);
    } else {
      setFormatClassName('');
    }
  }, [className]);

  return (
    <>
      <button
        disabled={disabled}
        className={formatClassName}
        type={type}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
      >
        {icon}{content}
      </button>
    </>
  );
}
