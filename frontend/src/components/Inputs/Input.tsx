import { IInput } from '../../types/inputs/inputs.interface';
import './Input.css';

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
  function renderingInput() {
    switch (variant) {
      case 'textarea':
        return (
          <textarea
            value={value ? value?.toString() : ''}
            className={className ? className : 'input-user outlined'}
            onChange={onChange || (() => {})}
            onKeyDown={handleKeyDown}
            placeholder={content}
            required
            disabled={isDisabled ? true : false}
          />
        );
      case 'checkbox':
        return (
          <section className="section-checkbox">
            <input
              id="default-checkbox"
              type={variant}
              value={''}
              className={className}
              onChange={onChange || (() => {})}
              onKeyDown={handleKeyDown}
              placeholder={content}
              disabled={isDisabled ? true : false}
            />
            <label htmlFor="default-checkbox">{value}</label>
          </section>
        );
      default:
        return (
          <input
            value={value ? value?.toString() : ''}
            className={className ? className : 'input-user outlined'}
            type={variant}
            {...(variant === 'number' && { min: '0', max: '5' })}
            onChange={onChange || (() => {})}
            onKeyDown={handleKeyDown}
            placeholder={content ? content : score?.toString()}
            required
            disabled={isDisabled ? true : false}
          />
        );
    }
  }

  return renderingInput();
}
