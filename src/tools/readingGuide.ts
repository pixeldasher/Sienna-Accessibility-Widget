import css from "./readingGuide.css";
/** @ts-ignore HTML Import */
import template from "./readingGuide.html";

declare global {
	interface Window {
		__asw__onScrollReadableGuide: EventListener;
	}
}

export default function readingGuide(enable = false) {
	let guide = document.querySelector(".asw-rg-container");

	if (enable) {
		if (!guide) {
			guide = document.createElement("div");
			guide.classList.add("asw-rg-container");
			guide.innerHTML = `<style>${css}</style>${template}`;

			const rgTop: HTMLElement = guide.querySelector(".asw-rg-top");
			const rgBottom: HTMLElement = guide.querySelector(".asw-rg-bottom");
			const margin = 20;

			window.__asw__onScrollReadableGuide = (event: MouseEvent) => {
				rgTop.style.height = `${event.clientY - margin}px`;
				rgBottom.style.height = `${window.innerHeight - event.clientY - margin * 2}px`;
			};

			document.addEventListener(
				"mousemove",
				window.__asw__onScrollReadableGuide,
				{ passive: false },
			);

			document.body.appendChild(guide);
		}
	} else {
		guide?.remove();

		if (window.__asw__onScrollReadableGuide) {
			document.removeEventListener(
				"mousemove",
				window.__asw__onScrollReadableGuide,
			);
			delete window.__asw__onScrollReadableGuide;
		}
	}
}
