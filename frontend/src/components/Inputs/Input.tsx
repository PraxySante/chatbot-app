import { IInput } from '../../types/inputs/inputs.interface';

export default function Input({
  variant,
  score,
  content,
  onChange,
  handleKeyDown,
  value,
}: IInput) {
  return (
    <input
      value={value ? value?.toString() : ''}
      className="input-user"
      type={variant}
      {...(variant === 'number' && { min: '0', max: '5' })}
      onChange={onChange || (() => {})}
      onKeyDown={handleKeyDown}
      placeholder={content ? content : score?.toString()}
      required
    />
  );
}
