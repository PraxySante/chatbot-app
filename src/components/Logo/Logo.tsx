type ImageAttributes = {
	imgSource: string;
};

export default function Image({ imgSource }: ImageAttributes) {
	return (
		<img src={imgSource} alt="" />
	);
}