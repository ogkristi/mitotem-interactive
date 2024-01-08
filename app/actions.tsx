"use server";
import { redirect } from "next/navigation";

export async function upload(initialState: string, formData: FormData) {
	const suffixes = process.env.ACCEPT_SUFFIX.split(",");

	const unacceptable: string = formData
		.getAll("file")
		.map((f: FormDataEntryValue) => f.name.toLowerCase().match(/\.\w+$/)[0])
		.find((suffix) => !suffixes.includes(suffix));

	if (unacceptable) {
		return `Unsupported file type: ${unacceptable}`;
	}

	const response = await fetch("http://127.0.0.1:5000/api/upload", {
		method: "POST",
		body: formData,
	});

	redirect(`/${formData.get("file").name}`);
}
