import { ILink } from '../../types/inputs/inputs.interface';

export default function Link({ onClick, id, name, className }: ILink) {
  return (
    <ul id={id} className={className} onClick={() => onClick(id)}>
      {name}
    </ul>
  );
}
