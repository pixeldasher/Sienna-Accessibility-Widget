import { HEADER_SELECTORS } from "../enum/Selectors";
import type IToolConfig from "../types/IToolConfig";
import { injectToolCSS } from "../utils/cssGenerator";

export const highlightTitleConfig: IToolConfig = {
	id: "highlight-title",
	selector: `html`,
	childrenSelector: HEADER_SELECTORS,
	styles: {
		outline: "2px solid #0048ff",
		"outline-offset": "2px",
	},
};

export default function highlightTitle(enable = false) {
	injectToolCSS({
		...highlightTitleConfig,
		enable,
	});
}
