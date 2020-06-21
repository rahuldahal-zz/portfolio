import { commonScripts } from "./modules/script";
import { index } from "./modules/index";
import { about } from "./modules/about";
import { resources } from "./modules/resources";
commonScripts();

if (document.getElementById("indexHeader")) {
    index();
}
if (document.getElementById("aboutHeader")) {
    about();
}

if (document.getElementById("resources")) {
    resources();
}
import "../css/style.scss";

document.getElementById("currentYear").textContent = new Date().getFullYear();

if (module.hot) {
    module.hot.accept();
}