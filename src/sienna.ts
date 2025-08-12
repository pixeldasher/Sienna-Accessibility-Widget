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

	const callback: ResizeObserverCallback = () => runAccessibility();
	const observer = new ResizeObserver(callback);
	observer.observe(document.documentElement);

	return {
		changeLanguage,
	};
}
