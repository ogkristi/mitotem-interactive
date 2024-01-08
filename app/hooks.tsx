import { useRef, useEffect } from "react";

export function useKeyboardNavigation() {
	const sideItemRef = useRef<HTMLDivElement>(null);

	const clickAndFocus = (e: Element | undefined | null) => {
		const htmlE = e as HTMLElement;
		htmlE?.click();
		htmlE?.focus();
	};

	const handleKeyboardNavigation = (
		e: React.KeyboardEvent<HTMLDivElement> & { currentTarget: HTMLDivElement }
	) => {
		e.preventDefault();
		const current = e.currentTarget.querySelector(".active");

		switch (e.key) {
			case "ArrowUp": {
				clickAndFocus(current?.previousElementSibling);
				return;
			}
			case "ArrowDown": {
				clickAndFocus(current?.nextElementSibling);
				return;
			}
			default:
				return;
		}
	};

	useEffect(() => {
		(sideItemRef.current?.querySelector(".active") as HTMLElement)?.focus();
	});

	return [sideItemRef, handleKeyboardNavigation];
}
