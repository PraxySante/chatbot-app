type ImageAttributes = {
  imgSource: string;
	classname: string;
};

export default function Image({ imgSource, classname }: ImageAttributes) {
  return <img className={classname} src={imgSource} alt="" />;
}
