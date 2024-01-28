import { useState, useRef, Dispatch, SetStateAction } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Upload({
	images,
	setImages,
}: {
	images: File[];
	setImages: Dispatch<SetStateAction<File[]>>;
}) {
	const formRef = useRef<HTMLFormElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [inDropZone, setInDropZone] = useState(false);
	const [message, setMessage] = useState<string>("");

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const suffixes = import.meta.env.VITE_ACCEPT_SUFFIX.split(",");

		const unacceptable: string = formData
			.getAll("file")
			.map((f: FormDataEntryValue) => f.name.toLowerCase().match(/\.\w+$/)[0])
			.find((suffix) => !suffixes.includes(suffix));

		if (unacceptable) {
			setMessage(`Unsupported file type: ${unacceptable}`);
			return;
		}

		setImages(images.concat(formData.getAll("file")));
	}

	function handleDrop(e: React.DragEvent<HTMLFormElement>) {
		e.stopPropagation();
		e.preventDefault();
		setInDropZone(false);

		inputRef.current && (inputRef.current.files = e.dataTransfer.files);
		formRef.current?.requestSubmit();
	}

	function toggleInDropZone(e: React.DragEvent<HTMLFormElement>) {
		e.stopPropagation();
		e.preventDefault();

		setInDropZone(!inDropZone);
	}

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			encType="multipart/form-data"
			id="dropbox"
			onDrop={handleDrop}
			onDragEnter={toggleInDropZone}
			onDragLeave={toggleInDropZone}
			onDragOver={(e) => e.preventDefault()}
			className={`p-2 m-2 flex flex-col justify-center items-center ${
				inDropZone ? "border-orange-400" : "border-sky-300"
			} bg-white border-2 border-dashed rounded font-medium`}
		>
			<DocumentArrowUpIcon className="w-1/6 shrink-0" />
			<span className="text-2xl">Drag and drop</span>
			<span>or</span>
			<label
				id="browse"
				htmlFor="file-selector"
				className="py-1 px-3 border border-slate-300 rounded text-lg transition hover:bg-slate-50 hover:cursor-pointer"
			>
				Browse files
			</label>
			<input
				ref={inputRef}
				type="file"
				id="file-selector"
				name="file"
				accept={import.meta.env.VITE_ACCEPT_SUFFIX}
				onChange={() => formRef.current?.requestSubmit()}
				className="opacity-0"
				multiple
			/>
			{message && (
				<p className="flex font-medium">
					<ExclamationTriangleIcon className="text-red-500 inline w-5 align-middle mr-1" />
					{message}
				</p>
			)}
		</form>
	);
}
