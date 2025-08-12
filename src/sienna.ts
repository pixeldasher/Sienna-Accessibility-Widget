import { getSavedUserSettings, userSettings } from "@/globals/userSettings";
import runAccessibility from "@/views/menu/runAccessibility";
import { renderWidget } from "@/views/widget/widget";
import { pluginConfig } from "./globals/pluginConfig";
import { changeLanguage } from "./i18n/changeLanguage";

export default function sienna({ options }) {
	const savedSettings = getSavedUserSettings();

	Object.assign(pluginConfig, options);
	Object.assign(userSettings, savedSettings);

	runAccessibility();
	renderWidget();

	let previousInlineSize = 0;
	const observer = new ResizeObserver(([entry]) => {
		const inlineSize = entry.borderBoxSize.at(0).inlineSize;

		if (typeof inlineSize === "number" && inlineSize !== previousInlineSize) {
			previousInlineSize = inlineSize;
			const states = userSettings.states;

			userSettings.states = {};
			runAccessibility();

			userSettings.states = states;
			runAccessibility();
		}
	});
	observer.observe(document.documentElement);

	return {
		changeLanguage,
	};
}
