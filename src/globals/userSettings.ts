import { getStorageData, saveStorageData } from "@/storage";

interface UserSettings {
	lang: string;
	position: string;
	states?: {
		fontSize?: number;
		contrast?: string|false;
	};
}

export const userSettings: UserSettings = {
	lang: undefined,
	position: undefined,
	states: {},
};

export const STORAGE_KEY = "asw-user-settings";

export function setUserStateSettings(state) {
	userSettings.states = {
		...userSettings.states,
		...state,
	};

	saveUserSettings();
}

export function saveUserSettings() {
	saveStorageData(STORAGE_KEY, userSettings);
}

export function getSavedUserSettings() {
	return getStorageData(STORAGE_KEY);
}
