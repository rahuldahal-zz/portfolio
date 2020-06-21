import { ReusableFunctions } from "./functions";
const _ = new ReusableFunctions();

export function resources() {
    const copyBtns = document.querySelectorAll(".copyBtn");
    copyBtns.forEach((btn) => {
        let copyTarget = document.getElementById(btn.dataset.copyTarget);
        btn.addEventListener("click", () => {
            _.copyToClipboard(copyTarget.textContent);
        });
    })
}