export default function Canvas({ params }: { params: { img: string } }) {
	const imgSrc = "/upload/" + params.img.replace(/\.\w+$/, ".webp");

	return <img src={imgSrc} className="max-h-full" alt="Failed to load image" />;
}
