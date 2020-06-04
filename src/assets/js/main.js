import { commonScripts } from "./modules/script";
import { index } from "./modules/index";
import { about } from "./modules/about";
commonScripts();

if (document.getElementById("indexHeader")) {
    index();
}
if (document.getElementById("aboutHeader")) {
    about();
}
import "../css/style.scss";

document.getElementById("currentYear").textContent = new Date().getFullYear();

if (module.hot) {
    module.hot.accept();
}