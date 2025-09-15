import { IInput } from '../../types/inputs/inputs.interface';

export default function Input({
  variant,
  score,
  content,
  onChange,
  handleKeyDown,
  value,
  className,
  isDisabled,
}: IInput) {
  return (
    <>
      {variant === 'textarea' ? (
        <textarea
          value={value ? value?.toString() : ''}
          className={className ? className : 'input-user'}
          onChange={onChange || (() => {})}
          onKeyDown={handleKeyDown}
          placeholder={content}
          required
          disabled={isDisabled ? true : false}
        />
      ) : (
        <input
          value={value ? value?.toString() : ''}
          className={className ? className : 'input-user'}
          type={variant}
          {...(variant === 'number' && { min: '0', max: '5' })}
          onChange={onChange || (() => {})}
          onKeyDown={handleKeyDown}
          placeholder={content ? content : score?.toString()}
          required
          disabled={isDisabled ? true : false}
        />
      )}
    </>
  );
}
