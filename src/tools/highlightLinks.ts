import { LINKS_SELECTORS } from "../enum/Selectors";
import type IToolConfig from "../types/IToolConfig";
import { injectToolCSS } from "../utils/cssGenerator";

export const highlightLinksConfig: IToolConfig = {
	id: "highlight-links",
	selector: `html`,
	childrenSelector: LINKS_SELECTORS,
	styles: {
		outline: "2px solid #0048ff",
		"outline-offset": "2px",
	},
};

export default function highlightLinks(enable = false) {
	injectToolCSS({
		...highlightLinksConfig,
		enable,
	});
}
