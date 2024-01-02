export default async function Canvas({ params: { img } }) {
	const imgSrc = "/" + img.replace(/\.tiff?/, ".webp");

	return <img src={imgSrc} className="max-h-full" />;
}
