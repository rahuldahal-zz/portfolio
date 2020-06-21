import { ReusableFunctions } from "./functions";
import throttle from "lodash/throttle";
const _ = new ReusableFunctions();

export function commonScripts() {

  window.addEventListener("load", function () {

    //stop loader on load
    _.remove_class(_.select("main"), "transitionActive");
    _.select("#loader_container").style.animation =
      "slideOut 0.2s ease-out forwards";
    let loader = _.select("#loader");
    loader.style.opacity = 0;
    this.setTimeout(function () {
      loader.style.display = "none";
    }, 500);

    //set the "fontAwesome", "google fonts", and "tawk.to" link after the page load
    let link1 = this.document.createElement("link");
    link1.setAttribute(
      "href",
      "https://fonts.googleapis.com/css?family=Montserrat:300,400,600&display=swap"
    );
    link1.setAttribute("rel", "stylesheet");

    let link2 = this.document.createElement("link");
    link2.setAttribute(
      "href",
      "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400i,400,600&display=swap"
    );
    link2.setAttribute("rel", "stylesheet");

    this.setTimeout(() => {
      _.select("head").appendChild(link1);
      _.select("head").appendChild(link2);
    }, 1000);

    let fontAwesome = this.document.createElement("script");
    fontAwesome.setAttribute("src", "https://kit.fontawesome.com/2628210dc1.js");

    this.document.querySelector("body").appendChild(fontAwesome);

    //fetchSVG
    let svgContainers = _.select(".svgContainer", 1);

    _.for_each(svgContainers, (container) => {
      let file = "./assets/images/svgs/" + container.attributes[0].nodeValue + ".svg";

      fetch(file)
        .then((res) => res.text())
        .then((data) => (container.innerHTML = data));
    });

    //ends here...

    //for tawk to
    this.setTimeout(() => {
      var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/5cb7449bd6e05b735b43157e/default";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    }, 3000);

    //end of tawk to script
  });



  if (window.innerWidth < 1024) {
    let ham = _.select("#ham");
    _.listen_click(ham, toggleMenu);

    function toggleMenu() {
      _.select("nav ul").classList.toggle("ul_active");
      ham.classList.toggle("ham_active");
      _.select("#fade").classList.toggle("fade");
    }
  }




  //variables to assist on "scroll" event
  let lastScroll = 0;
  let hasScrolledTop = false;

  //scrollDetection

  let scrollThrottle = throttle(firesOnScroll, 200);
  window.addEventListener("scroll", scrollThrottle);

  function firesOnScroll() {
    let scrolled = window.pageYOffset; //amount scrolled from absolute top of the window

    //for navBar

    const nav = _.select("nav");
    if (scrolled < lastScroll) {
      nav.style.transform = "translateY(0)";
      nav.style.backgroundColor = "#006699";
      nav.style.boxShadow = "0 10px 10px -5px rgba(0, 0, 0, 0.4)";
      hasScrolledTop = true;
    }
    if (scrolled > lastScroll && hasScrolledTop) {
      nav.style.transform = "translateY(-10vh)";
    }
    // if (scrolled < 592) hasScrolledTop = false; ----> use intersection observer in a re-usable way 


    lastScroll = scrolled; //updates lastScroll to current "scrolled" value
  }





  //page transition

  let pageTransitionTriggers = _.select(".pageTransition", 1);
  let main = _.select("main");

  _.for_each(pageTransitionTriggers, (trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      main.classList.add("transitionActive");
      let url = e.currentTarget.getAttribute("href");

      setTimeout(() => {
        window.location = url;
      }, 400);
    });
  });



  //form validation

  let inputFields = _.select("form .field", 1);
  let submitButtons = _.select('form button[type="submit"]', 1);

  _.for_each(submitButtons, (btn) => {
    btn.addEventListener("click", (e) => {
      validate(e, e.currentTarget.form);
    });
  });

  function validate(event, form) {
    let formFields = _.select(`#${form.getAttribute("id")} .field`, 1);

    function isValid(field) {
      field.classList.remove("errorAnim");
      field.style.borderBottom = "#00ab66 4px solid";
    }

    _.for_each(formFields, (field) => {
      if (field.getAttribute("type") == "email") {
        if (field.value.indexOf("@") == -1) {
          event.preventDefault();
          field.classList.add("errorAnim");
          _.notify(
            "please enter a valid email address!",
            "animation-delay: 0.3s; color: red;",
            5000
          );
        } else isValid(field);
      } else if (field.getAttribute("type") != "number") {
        if (field.value == "") {
          event.preventDefault();
          field.classList.add("errorAnim");
          _.notify(
            `"${field.getAttribute("name")}" field should not be empty`,
            "animation-delay: 0.3s; color: red;",
            5000
          );
        } else isValid(field);
      }
    });
  }

  //when keyboard is pressed on fields

  _.for_each(inputFields, (inputField) => {
    //for label animation

    inputField.addEventListener("focus", () => {
      let label = inputField.previousElementSibling;
      if (label.tagName === "LABEL") {
        label.style.transform = "translateY(0) scale(0.8)";
        label.style.color = "#ccc";
      }
    });
    inputField.addEventListener("blur", () => {
      if (inputField.value) return;
      let label = inputField.previousElementSibling;
      if (label.tagName === "LABEL") {
        label.style.transform = "translate(8px, 31px) scale(1)";
        label.style.color = "#eee";
      }
    });
  });
}