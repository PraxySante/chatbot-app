import { ILink } from '../../types/inputs/inputs.interface';

export default function Link({ children, onClick, id, name, className }: ILink) {
  return (
    <ul id={id} className={className} onClick={() => onClick(id)}>
      {children}
    </ul>
  );
}
