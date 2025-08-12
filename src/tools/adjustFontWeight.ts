import { ALL_ELEMENT_SELECTORS } from "../enum/Selectors";
import type IToolConfig from "../types/IToolConfig";
import { injectToolCSS } from "../utils/cssGenerator";

export const adjustFontWeightConfig: IToolConfig = {
	id: "font-weight",
	selector: `html`,
	childrenSelector: ALL_ELEMENT_SELECTORS,
	styles: {
		"font-weight": "700",
	},
};

export default function adjustFontWeight(enable = false) {
	injectToolCSS({
		...adjustFontWeightConfig,
		enable,
	});
}
