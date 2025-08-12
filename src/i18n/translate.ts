import { userSettings } from "../globals/userSettings";
import { LANGUAGE_DICTIONARY } from "./Languages";

export function t(label: string): string {
	const dictionary =
		LANGUAGE_DICTIONARY[userSettings.lang] ?? LANGUAGE_DICTIONARY.de;
	return dictionary[label] ?? label;
}
