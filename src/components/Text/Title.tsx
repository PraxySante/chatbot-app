import { createElement } from 'react';

type TitleAttributes = {
  content: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  className: string;
};

export default function Title({ content, tag, className }: TitleAttributes) {
  return <>{createElement(tag, { className }, content)}</>;
}
