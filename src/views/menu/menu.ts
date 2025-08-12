import renderMenu from "./renderMenu";
import toggleMenu from "./toggleMenu";
import translateWidget from "./translateWidget";

export let $menu: HTMLElement;

export function openMenu() {
	if ($menu) {
		toggleMenu();
	} else {
		$menu = renderMenu();
	}

	translateWidget();
}
