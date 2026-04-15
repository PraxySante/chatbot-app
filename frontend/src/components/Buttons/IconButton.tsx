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
  onTouchStart,
  onTouchEnd,
  content,
  title,
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
    <button
      title={title}
      disabled={disabled}
      className={formatClassName}
      type={type}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {icon}
      {content}
    </button>
  );
}
