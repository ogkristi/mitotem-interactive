export async function putImage(img: File) {
	const formData = new FormData();
	formData.append("file", img);
	return fetch("/api/images", { method: "PUT", body: formData });
}

export async function getWebp(img: File) {
	return fetch(`/api/images/${img.name}`, { method: "GET" })
		.then((res) => res.blob())
		.then((blob) => new File([blob], img.name));
}

export async function putMask(mask: File) {
	const formData = new FormData();
	formData.append("file", mask);
	return fetch("/api/masks", { method: "PUT", body: formData });
}

export async function getMask(img: File) {
	return fetch(`/api/masks/${img.name}`, { method: "GET" })
		.then((res) => res.blob())
		.then((blob) => new File([blob], img.name));
}

export async function getData(img: File) {
	return fetch(`/api/data/${img.name}`, { method: "GET" }).then((res) =>
		res.json()
	);
}
