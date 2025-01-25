import { createElement } from 'react';

type DescriptionAttributes = {
  id?: string;
  content: string;
  tag: 'p';
  className: string;
  children?: JSX.Element;
};

export default function Description({
  id,
  tag,
  content,
  className,
  children,
}: DescriptionAttributes) {
  return <>{createElement(tag, { className, id }, content, children)} </>;
}
