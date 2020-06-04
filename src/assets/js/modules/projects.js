function slide(imgTag, srcArray) {
  const imgs = document.querySelectorAll(imgTag);
  const previousBtns = document.querySelectorAll(".slide_previous");
  const nextBtns = document.querySelectorAll(".slide_next");
  let index = 0;

  srcArray.forEach((src) => {
    fetch(src);
  });

  function slideTo(index, img) {
    img.style.opacity = 0;
    img.style.transform = "scale(0)";
    setTimeout(() => {
      img.setAttribute("src", srcArray[index]);
      img.style.opacity = 1;
      img.style.transform = "scale(1)";
    }, 300);
  }

  previousBtns.forEach((prev) => {
    prev.addEventListener("click", () => {
      index === 0 ? (index = srcArray.length - 1) : (index -= 1);
      slideTo(index, prev.nextElementSibling);
    });
  });

  nextBtns.forEach((next) => {
    next.addEventListener("click", () => {
      index === srcArray.length - 1 ? (index = 0) : (index += 1);
      slideTo(index, next.previousElementSibling);
    });
  });
}

slide(".slideShow_image", [
  "/assets/images/projects/footballStats1.png",
  "/assets/images/projects/footballStats2.png",
]);

/**
 * slideShow_image = imageContainer, the <img> whose "src" will be changed dynamically
 */
// slide(".slideShow_image", [
//   "/assets/images/projects/footballStats1.png",
//   "/assets/images/projects/footballStats2.png",
// ]);

