"use client";
import { useState, useRef } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import { upload } from "@/app/actions";

export default function Upload() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [inDropZone, setInDropZone] = useState(false);

	function handleDrop(e: React.DragEvent<HTMLFormElement>) {
		e.stopPropagation();
		e.preventDefault();
		setInDropZone(false);

		formRef.current?.set("files", e.dataTransfer.files);
		formRef.current?.submit();
	}

	function toggleInDropZone(e) {
		e.stopPropagation();
		e.preventDefault();

		setInDropZone(!inDropZone);
	}

	return (
		<div className="h-full lg:w-3/4 p-2">
			<form
				ref={formRef}
				action={upload}
				encType="multipart/form-data"
				id="dropbox"
				onDrop={handleDrop}
				onDragEnter={toggleInDropZone}
				onDragLeave={toggleInDropZone}
				onDragOver={(e) => e.preventDefault()}
				className={`h-full flex flex-col justify-center items-center ${
					inDropZone ? "border-orange-400" : "border-sky-200"
				} bg-slate-100 rounded-md border-2 border-dashed text-slate-500 font-bold`}
			>
				<DocumentArrowUpIcon className="w-40" />
				<span className="text-2xl">Drag and drop</span>
				<span>or</span>
				<label
					htmlFor="file"
					className="py-1 px-3 bg-slate-500 rounded-md text-lg text-slate-50 transition hover:bg-slate-600"
				>
					Browse files
				</label>
				<input
					type="file"
					id="file"
					name="file"
					accept=".tif, .tiff"
					onChange={() => formRef.current?.submit()}
					className="opacity-0"
					multiple
				/>
			</form>
		</div>
	);
}