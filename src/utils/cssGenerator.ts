import type IToolConfig from "../types/IToolConfig";
import addStylesheet from "./addStylesheet";

const browserPrefixes = ["-moz-", "-webkit-", ""];
const propertiesNeedPrefix = ["filter"];

export function generateCSS(styles: object): string {
	let css = "";

	if (styles) {
		for (const key in styles) {
			const prefixes = propertiesNeedPrefix.includes(key)
				? browserPrefixes
				: [""];
			prefixes.forEach((prefix: string) => {
				css += `${prefix}${key}:${styles[key]} !important;`;
			});
		}
	}

	return css;
}

export interface IWrapCSSToSelectorArgs {
	selector: string;
	childrenSelector: string[];
	css: string;
}

export function wrapCSSToSelector({
	selector,
	childrenSelector = [""],
	css,
}: IWrapCSSToSelectorArgs): string {
	let output = "";

	childrenSelector.forEach((childSelector) => {
		output += `${selector} ${childSelector}{${css}}`;
	});

	return output;
}

export function generateCSSFromConfig(config: IToolConfig): string {
	let output = "";

	if (config) {
		output += generateCSS(config.styles);

		if (output.length && config.selector) {
			output = wrapCSSToSelector({
				selector: config.selector,
				childrenSelector: config.childrenSelector,
				css: output,
			});
		}

		output += config.css ?? "";
	}

	return output;
}

export function injectToolCSS(config: IToolConfig) {
	const { id = "", enable = false } = config;

	const toolId = `asw-${id}`;

	if (enable) {
		const css = generateCSSFromConfig(config);

		addStylesheet({
			css,
			id: toolId,
		});
	} else {
		document.getElementById(toolId)?.remove();
	}

	document.documentElement.classList.toggle(toolId, enable);
}
