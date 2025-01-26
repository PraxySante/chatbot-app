import { IInput } from '../../types/inputs/inputs.interface';

export default function Input({ variant, score, content, onChange }: IInput) {
  return (
    <input
      className="input-user"
      type={variant}
      {...(variant === 'number' && { min: '0', max: '5' })}
      onChange={onChange}
      placeholder={content ? content : score?.toString()}
      defaultValue={score ? score.toString() : ''}
      required
    />
  );
}
