"use client";
import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import { upload } from "@/app/actions";
import Spinner from "@/app/spinner";

function FormContent() {
	const { pending } = useFormStatus();

	return pending ? (
		<Spinner className="w-1/3 stroke-slate-500 text-sky-500" />
	) : (
		<>
			<DocumentArrowUpIcon className="w-40" />
			<span className="text-2xl">Drag and drop</span>
			<span>or</span>
			<label
				htmlFor="file"
				className="py-1 px-3 bg-slate-500 rounded-md text-lg text-slate-50 transition hover:bg-slate-600"
			>
				Browse files
			</label>
		</>
	);
}

export default function Upload() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [inDropZone, setInDropZone] = useState(false);

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
		<div className="h-full lg:grow p-2">
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
				<FormContent />
				<input
					ref={inputRef}
					type="file"
					id="file"
					name="file"
					accept={process.env.ACCEPT_SUFFIX}
					onChange={() => formRef.current?.requestSubmit()}
					className="opacity-0"
					multiple
				/>
			</form>
		</div>
	);
}
