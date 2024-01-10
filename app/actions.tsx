"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getImages() {
	return fetch("http://127.0.0.1:5000/api/images", {
		method: "GET",
		cache: "no-store",
	}).then((res) => res.json());
}

export async function postImages(initialState: string, formData: FormData) {
	const suffixes = process.env.ACCEPT_SUFFIX.split(",");

	const unacceptable: string = formData
		.getAll("file")
		.map((f: FormDataEntryValue) => f.name.toLowerCase().match(/\.\w+$/)[0])
		.find((suffix) => !suffixes.includes(suffix));

	if (unacceptable) {
		return `Unsupported file type: ${unacceptable}`;
	}

	await fetch("http://127.0.0.1:5000/api/images", {
		method: "POST",
		body: formData,
	});

	revalidatePath("/");
	redirect(`/${formData.get("file").name}`);
}
