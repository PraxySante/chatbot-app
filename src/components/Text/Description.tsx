import { createElement } from 'react';

type DescriptionAttributes = {
  id?:string
  content: string;
  tag: 'p';
  className: string;
};

export default function Description({
  id,
  tag,
  content,
  className,
}: DescriptionAttributes) {
  return <>{createElement(tag, { className, id }, content)}</>;
}
