import { useRef, useEffect } from "react";

export function useKeyboardNavigation() {
	const elementRef = useRef<HTMLElement>(null);

	const clickAndFocus = (e: Element | undefined | null) => {
		const htmlE = e as HTMLElement;
		htmlE?.click();
		htmlE?.focus();
	};

	const handleKeyboardNavigation = (
		e: React.KeyboardEvent<HTMLElement> & { currentTarget: HTMLElement }
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
		(elementRef.current?.querySelector(".active") as HTMLElement)?.focus();
	});

	return [elementRef, handleKeyboardNavigation];
}
