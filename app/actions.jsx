"use server";
import { redirect } from "next/navigation";

export async function upload(formData) {
	const response = await fetch("http://127.0.0.1:5000/api/upload", {
		method: "POST",
		body: formData,
	});
	redirect(`/${formData.get("file").name}`);
}
