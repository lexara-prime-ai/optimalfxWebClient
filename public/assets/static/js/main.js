// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;
  let slideInterval;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    curSlide = (curSlide === maxSlide - 1) ? 0 : curSlide + 1;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    curSlide = (curSlide === 0) ? maxSlide - 1 : curSlide - 1;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const startSlide = function () {
    slideInterval = setInterval(nextSlide, 3000);
  };

  const stopSlide = function () {
    clearInterval(slideInterval);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
    startSlide();
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  // Pause auto-slide on hover and resume on mouse leave
  document.querySelector(".slider").addEventListener("mouseover", stopSlide);
  document.querySelector(".slider").addEventListener("mouseout", startSlide);

  // Pause auto-slide on touch and resume on touch end (mobile)
  document.querySelector(".slider").addEventListener("touchstart", stopSlide);
  document.querySelector(".slider").addEventListener("touchend", startSlide);
};

slider();

// TradingView Slider
// const tradingViewSlider = function () {
//   const slider = document.querySelector(".tradingview-slider");
//   const slides = document.querySelectorAll(".tradingview-slide");
//   let curSlide = 0;
//   const maxSlide = slides.length;
//   let slideInterval;

//   const goToSlide = function (slide) {
//     slider.style.transform = `translateX(-${100 * slide}%)`;
//   };

//   const nextSlide = function () {
//     curSlide = (curSlide === maxSlide - 1) ? 0 : curSlide + 1;
//     goToSlide(curSlide);
//   };

//   const startSlide = function () {
//     slideInterval = setInterval(nextSlide, 3000);
//   };

//   const stopSlide = function () {
//     clearInterval(slideInterval);
//   };

//   const init = function () {
//     goToSlide(0);
//     startSlide();
//   };
//   init();

//   // Pause auto-slide on hover and resume on mouse leave (desktop)
//   slider.addEventListener("mouseover", stopSlide);
//   slider.addEventListener("mouseout", startSlide);

//   // Pause auto-slide on touch and resume on touch end (mobile)
//   slider.addEventListener("touchstart", stopSlide);
//   slider.addEventListener("touchend", startSlide);
// };

// tradingViewSlider();


// Check whether user has an [ACTIVE] session
// window.addEventListener("load", () => {
//   const token = localStorage.getItem("SESSION_TOKEN");

//   if (token) {
//     console.log("User [AUTHORIZED]...");
//   } else {
//     // [DEBUG] logs
//     console.log("User not [AUTHORIZED]\n[REDIRECTING]...");

//     // Redirect user to login page
//     window.location.href =
//       "http://localhost:5500/web_client/public/assets/pages/register.html?";
//   }
// });
