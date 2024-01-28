import {
	PaintBrushIcon,
	CursorArrowRaysIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

export default function Tools() {
	const style = "h-6 w-6 p-[2px] cursor-pointer transition hover:text-sky-600";

	return (
		<div className="flex justify-center p-1">
			<PaintBrushIcon className={style} />
			<CursorArrowRaysIcon className={style} />
			<MagnifyingGlassIcon className={style} />
		</div>
	);
}
