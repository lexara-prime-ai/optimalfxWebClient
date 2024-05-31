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

// Gallery slider
const gallerySlider = function () {
  // Get all slides and necessary buttons and indicators
  const slides = document.querySelectorAll(".gallery-slide");
  const btnLeft = document.querySelector(".gallery-slider__btn--left");
  const btnRight = document.querySelector(".gallery-slider__btn--right");
  const indicatorContainer = document.querySelector(".gallery-indicators");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Function to go to a specific slide
  const goToSlide = function (slide) {
      slides.forEach((s, i) => {
          s.style.transform = `translateX(${100 * (i - slide)}%)`;
      });
  };

  // Function to create indicators for each slide
  const createIndicators = function () {
      slides.forEach((_, i) => {
          const indicator = document.createElement("button");
          indicator.classList.add("gallery-indicator");
          if (i === curSlide) indicator.classList.add("active");
          indicator.dataset.slide = i;
          indicatorContainer.appendChild(indicator);
      });
  };

  // Function to activate the correct indicator
  const activateIndicator = function (slide) {
      document.querySelectorAll(".gallery-indicator").forEach(indicator => {
          indicator.classList.remove("active");
      });
      document.querySelector(`.gallery-indicator[data-slide="${slide}"]`).classList.add("active");
  };

  // Function to move to the next slide
  const nextSlide = function () {
      curSlide = (curSlide === maxSlide - 1) ? 0 : curSlide + 1;
      goToSlide(curSlide);
      activateIndicator(curSlide);
  };

  // Function to move to the previous slide
  const prevSlide = function () {
      curSlide = (curSlide === 0) ? maxSlide - 1 : curSlide - 1;
      goToSlide(curSlide);
      activateIndicator(curSlide);
  };

  // Function to automatically slide through the images
  const autoSlide = function () {
      setInterval(nextSlide, 5000); // Change slide every 5 seconds
  };

  // Initialize the slider
  const init = function () {
      goToSlide(0);
      createIndicators();
      activateIndicator(0);
      autoSlide();
  };
  init();

  // Event listeners for buttons
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // Event listener for indicators
  indicatorContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("gallery-indicator")) {
          const { slide } = e.target.dataset;
          curSlide = parseInt(slide, 10);
          goToSlide(curSlide);
          activateIndicator(curSlide);
      }
  });
};

gallerySlider();


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
