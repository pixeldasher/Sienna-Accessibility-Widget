import { userSettings } from "@/globals/userSettings";
import adjustFontSize from "@/tools/adjustFontSize";
import enableContrast from "@/tools/enableContrast";
import renderTools from "./renderTools";

export default function runAccessibility() {
	adjustFontSize(userSettings?.states?.fontSize);
	renderTools();
	enableContrast(userSettings?.states?.contrast);
}
