import Spinner from "@/app/ui/spinner";

export default function Loading() {
	return (
		<div className="h-full lg:grow flex justify-center align-middle p-2">
			<Spinner className="w-1/3 stroke-gray-200 text-sky-200" />
		</div>
	);
}
