import { ReusableFunctions } from "./functions";
const _ = new ReusableFunctions();


export function about() {

    let thresholdValue, delay;
    if (_.getUserAgent() === "chrome") {
        thresholdValue = 0.5;
        delay = 0;
    } else {
        thresholdValue = 0;
        delay = 1;
    }


    window.onload = () => {
        //just so that "browser" gets time to breathe...
        setTimeout(() => {
            _.style("#theHook", ["transform", "opacity"], ["translateX(0)", "1"]);
            _.style("#avatar", ["transform", "opacity"], ["translateX(0)", "1"]);
        }, 200);
    }

    let observer = new IntersectionObserver(
        function (entries) {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting == true &&
                    entry.target == _.select("#mySystem")
                ) {
                    let processPara = _.select(".processContainer p", 1);
                    let processSVG = _.select(".processSVG", 1);
                    _.for_each(
                        processSVG,
                        (svg) =>
                            (svg.style.animation = `processSVG_ 0.3s ease-in forwards ${svg.attributes[1].nodeValue}s`)
                    );

                    _.for_each(
                        processPara,
                        (para) =>
                            (para.style.animation = `processPara_ 0.5s cubic-bezier(0.64, 1.13, 0.67, 1.53) forwards ${para.attributes[2].nodeValue}s`)
                    );
                }
            });
        },
        {
            root: null,
            rootMargin: "0px 0px 0px 0px",
            threshold: [`${thresholdValue}`],
        }
    );

    observer.observe(document.querySelector("#mySystem"));
}