import { ALL_ELEMENT_SELECTORS } from "../enum/Selectors";
import type IToolConfig from "../types/IToolConfig";
import { injectToolCSS } from "../utils/cssGenerator";

export const adjustLetterSpacingConfig: IToolConfig = {
	id: "letter-spacing",
	selector: `html`,
	childrenSelector: ALL_ELEMENT_SELECTORS,
	styles: {
		"letter-spacing": "2px",
	},
};

export default function adjustLetterSpacing(enable = false) {
	injectToolCSS({
		...adjustLetterSpacingConfig,
		enable,
	});
}
