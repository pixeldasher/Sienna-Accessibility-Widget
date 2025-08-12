import { getCookie, setCookie } from "./utils/cookies";

export function saveStorageData(key: string, value: number|string|object) {
	const jsonValue = JSON.stringify(value);

	try {
		localStorage.setItem(key, jsonValue);
	} catch (_e) {
		setCookie(key, jsonValue);
	}
}

export function getStorageData(key: string) {
	let data = "";

	try {
		data = localStorage.getItem(key);
	} catch (_e) {
		data = getCookie(key);
	}

	try {
		return JSON.parse(data);
	} catch (_e) {
		return {};
	}
}
