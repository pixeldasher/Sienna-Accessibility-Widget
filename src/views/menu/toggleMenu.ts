import { $menu } from "./menu";

export default function toggleMenu() {
	$menu.style.display = $menu.style.display === "none" ? "block" : "none";
}
