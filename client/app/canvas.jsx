import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";

export default function Canvas() {
	return (
		<div className="h-full p-2">
			<form className="h-full">
				<div className="h-full flex flex-col justify-center items-center bg-slate-100 rounded-md border-2 border-dashed border-sky-200 text-slate-500 font-bold">
					<DocumentArrowUpIcon className="w-40" />
					<span className="text-2xl">Drag and drop</span>
					<span>or</span>
					<button className="py-1 px-3 bg-slate-500 rounded-md text-lg text-slate-50 transition hover:bg-slate-600">
						Browse files
					</button>
				</div>
			</form>
		</div>
	);
}
