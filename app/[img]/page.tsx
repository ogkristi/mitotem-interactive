export default async function Canvas({ params }: { params: { img: string } }) {
	const imgSrc = "/upload/" + params.img.replace(/\.tiff?/, ".webp");

	return <img src={imgSrc} className="max-h-full" />;
}
