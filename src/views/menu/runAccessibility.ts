import { userSettings } from "@/globals/userSettings";
import adjustFontSize from "@/tools/adjustFontSize";
import enableContrast from "@/tools/enableContrast";
import renderTools from "./renderTools";

let observer: ResizeObserver;

export default function runAccessibility() {
	adjustFontSize(userSettings?.states?.fontSize);
	renderTools();
	enableContrast(userSettings?.states?.contrast);

	let previousInlineSize = 0;
	let timeout = 0;

	if (observer instanceof ResizeObserver) observer.disconnect();
	observer = new ResizeObserver(([entry]) => {
		const inlineSize = entry.borderBoxSize.at(0).inlineSize;

		if (typeof inlineSize === "number" && inlineSize !== previousInlineSize) {
			previousInlineSize = inlineSize;
			clearTimeout(timeout);

			adjustFontSize();
			timeout = setTimeout(() => {
				// Get the original font size
				requestAnimationFrame(() =>
					adjustFontSize(userSettings?.states?.fontSize),
				);
			}, 1000 / 60);
		}
	})
	observer.observe(document.documentElement);
}
