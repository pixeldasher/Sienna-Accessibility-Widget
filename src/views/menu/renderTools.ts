import { userSettings } from "@/globals/userSettings";
import adjustFontWeight from "@/tools/adjustFontWeight";
import adjustLetterSpacing from "@/tools/adjustLetterSpacing";
import adjustLineHeight from "@/tools/adjustLineHeight";
import bigCursor from "@/tools/bigCursor";
import highlightLinks from "@/tools/highlightLinks";
import highlightTitle from "@/tools/highlightTitle";
import readableFont from "@/tools/readableFont";
import readingGuide from "@/tools/readingGuide";
import stopAnimations from "@/tools/stopAnimations";

export default function renderTools() {
	const states = userSettings?.states;

	highlightTitle(states["highlight-title"]);
	highlightLinks(states["highlight-links"]);

	adjustLetterSpacing(states["letter-spacing"]);
	adjustLineHeight(states["line-height"]);
	adjustFontWeight(states["font-weight"]);

	readableFont(states["readable-font"]);

	readingGuide(states["readable-guide"]);
	stopAnimations(states["stop-animations"]);
	bigCursor(states["big-cursor"]);
}
