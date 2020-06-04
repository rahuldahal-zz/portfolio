import { ReusableFunctions } from "./functions";
const _ = new ReusableFunctions();

export function index() {
  if (window.innerWidth < 370) {
    _.select("#tagline").style.fontSize = "22px";
  }

  let thresholdValue, delay;
  if (_.getUserAgent() === "chrome") {
    thresholdValue = 0.5;
    delay = 0;
  } else {
    thresholdValue = 0;
    delay = 1;
  }

  let observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting == true && entry.target == _.select(".taglines")) {
          let atStairs = _.select("#atStairs");
          if (window.innerHeight < 768)
            atStairs.style.transform = "translateX(0)";
          else atStairs.style.transform = "translateX(-25%)";
          atStairs.style.opacity = 1;
          _.select("#lower_tagline").style.animation =
            "swingX 1s ease-in-out forwards";
        }

        if (
          entry.isIntersecting == true &&
          entry.target == _.select("#whyChooseMe")
        ) {
          let data = _.select(".animatable", 1);

          _.for_each(data, (d) => {
            d.style.animation = `translate0 1s ease-in-out forwards ${d.attributes[1].nodeValue}s`;
          });
        }
        if (entry.isIntersecting == true && entry.target == _.select("#skills")) {
          let skill_texts = _.select("#skill_texts");
          skill_texts.style.opacity = 1;
          skill_texts.style.transform = "translateX(0)";
          skill_texts.style.transitionDelay = delay;
          let skillsContainer = _.select("#skillsContainer");
          skillsContainer.style.opacity = 1;
          skillsContainer.style.transform = "translateX(0)";
          skillsContainer.style.transitionDelay = delay;
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: [`${thresholdValue}`],
    }
  );

  observer.observe(document.querySelector(".taglines"));
  observer.observe(document.querySelector("#whyChooseMe"));

}