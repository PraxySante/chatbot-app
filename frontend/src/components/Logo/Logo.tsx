type ImageAttributes = {
  imgSource: string;
  classname: string;
  alt?: string;
};

export default function Image({ imgSource, classname, alt }: ImageAttributes) {
  return <img className={classname} src={imgSource} alt={alt} />;
}
