export class ReusableFunctions {

  getUserAgent() {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
      return "chrome";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return "firefox";
    }
  }

  display(value) {
    console.log(value);
  }

  select(target, boolean) {
    if (boolean == 1) {
      return document.querySelectorAll(target);
    } else {
      return document.querySelector(target);
    }
  }

  //copy to clipboard
  copyToClipboard(textToBeCopied) {
    let textarea = document.createElement("textarea");
    textarea.value = textToBeCopied;
    document.body.appendChild(textarea);
    textarea.select();
    if (document.execCommand("copy"))
      this.notify("COPIED!", "animation-delay: 0s ; color: green;", 3000);
    else
      this.notify("Failed to copy", "animation-delay: 0s ; color: red;", 3000);
    textarea.remove();
  }

  //scroll listener

  listen_scroll(target) {
    return target.addEventListener("scroll", do_this);
  }

  //click listener
  listen_click(target, do_this) {
    return target.addEventListener("click", do_this);
  }

  //mouseEnter
  listen_hover(target, do_this) {
    return target.addEventListener("mouseenter", do_this);
  }

  //mouseLeave
  listen_mouseleave(target, do_this) {
    return target.addEventListener("mouseleave", do_this);
  }

  //listen_blur
  listen_blur(target, do_this) {
    return target.addEventListener("blur", do_this);
  }

  //change bg-color

  change_bg(target, value) {
    return (document.querySelector(target).style.background = value);
  }

  //add class

  add_class(target, value) {
    return target.classList.add(value);
  }

  //remove class

  remove_class(target, value) {
    return target.classList.remove(value);
  }

  //toggle class

  toggle_class(target, value) {
    return target.classList.toggle(value);
  }

  //for each loop on array

  for_each(array, do_this) {
    return Array.from(array).forEach(do_this);
  }

  //change innerHTML

  change_innerHTML(target, to) {
    return (target.innerHTML = to);
  }

  //change textContent

  change_textContent(target, to) {
    return (target.textContent = to);
  }

  //addAnimation property

  add_animation(target, value) {
    return (target.style.animation = value);
  }

  //change style
  style(target, properties, values) {
    let element = this.select(target);
    for (let i = 0; i < properties.length; i++) {
      element.style[properties[i]] = values[i];
    }
  }

  // transform it
  transformIt(target, value) {
    return (target.style.transform = value);
  }


  //animate

  animate(target, keyframe, duration = 0.3, delay = 0) {
    let element = document.querySelector(target);
    console.log(element);
    element.style.animation = `${keyframe} ${duration}s ${delay}s forwards`;
  }

  //notify

  notify(text, style = "", time = 3000) {
    //creation of the paragraph
    let notification = document.createElement("p");
    notification.setAttribute("style", style);
    notification.setAttribute("class", "notification");
    notification.textContent = text;

    //appending that paragraph to the parent, stack!
    let stack = document.getElementById("notificationsStack");
    stack.appendChild(notification);

    //activating fade
    let fade = this.select("#fade");
    fade.classList.add("fade");

    //after specified time, remove that para. from its parent
    setTimeout(() => {
      notification.style.animation =
        "translateY-reverse 0.3s ease-in-out forwards";
      fade.classList.remove("fade");
      setTimeout(() => {
        stack.removeChild(notification);
      }, 300); //second timeout delays the child remove process, as to show the "reverse" animation
    }, time);
  }

}