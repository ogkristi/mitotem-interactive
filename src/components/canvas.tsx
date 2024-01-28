import { Result } from "../App";
import Spinner from "./spinner";

export default function Canvas({ result }: { result: Result | undefined }) {
	return result ? (
		<img
			src={URL.createObjectURL(result.webp as Blob)}
			className="h-full w-full object-scale-down"
			alt="Failed to load image"
		/>
	) : (
		<Spinner className="w-1/3 stroke-gray-200 text-sky-200" />
	);
}
