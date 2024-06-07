// Debugging
const LOG = console.log;

// Selectors
const subTitle = document.querySelector(".hero-text");
const countryInput = document.querySelector("#country");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const registrationButton = document.querySelector("#registration-form-btn");
const loginButton = document.querySelector("#login-form-btn");
const logoutButton = document.querySelector("#log-out");
const proceedButton = document.querySelector("#proceed-form-btn");

// -> Enroll & View Courses buttons
const enrollButtonNavigation = document.querySelector("#enroll-navigation");
const viewCoursesButtonNavigation = document.querySelector(
  "#view-courses-navigation"
);
const enrollButton = document.querySelector("#enroll");
const viewCoursesButton = document.querySelector("#view-courses");

const ENDPOINTS = Object.freeze({
  // Authenticatio
  REGISTRATION: "http://localhost:5000/api/Auth/register",
  LOGIN: "http://localhost:5000/api/Auth/login",
  // Users
  ADD_USER: "http://localhost:5000/api/User",
  UPDATE_USER: "http://localhost:5000/api/User",
  DELETE_USER: "http://localhost:5000/api/User",
  GET_USER: "http://localhost:5000/api/User",
  GET_USERS: "http://localhost:5000/api/User",
  // Courses
  ADD_COURSE: "http://localhost:5000/api/Course",
  UPDATE_COURSE: "http://localhost:5000/api/Course",
  DELETE_COURSE: "http://localhost:5000/api/Course",
  GET_COURSE: "http://localhost:5000/api/Course",
  GET_COURSES: "http://localhost:5000/api/Course",
});

// [REDIRECT]
//   window.location.href = 'http://localhost:5500/web_client/public/assets/pages/login.html';

// CUSTOM [ERROR] HANDLER
// [ERROR] handling
class ErrorHandling {
  static propagateError(message, process) {
    LOG(
      `
            [AN ERROR OCCURRED]
            [PROCESS] -> ${process}
            [MESSAGE] -> ${message}
            `
    );
  }
}
///////// END ////////

class Client {
  //////////////////////////
  ////// GET [USERS] /////
  ///////////////////////
  static async getUsers() {
    try {
      const RESPONSE = await fetch(ENDPOINTS.GET_USERS.trim());
      const USERS = await RESPONSE.json();
      LOG(USERS);
    } catch (error) {
      ErrorHandling.propagateError(error, "getUsers");
    }
  }
}

class App {
  static verifySessionStatus() {
    // Enable [PROCEED] button
    if (localStorage.getItem("SESSION_TOKEN")) {
      viewCoursesButton.classList.add("visible");
      // Hide the following buttons
      enrollButton.classList.remove("visible");
      enrollButtonNavigation.classList.remove("visible");
    } else {
      viewCoursesButton.classList.remove("visible");
      enrollButton.classList.add("visible");
      enrollButtonNavigation.classList.add("visible");
    }
  }

  static logOut() {
    localStorage.clear();
  }
}

App.verifySessionStatus();

//////////////////////////
// TOGGLE SIDE NAVIGATION
//////////////////////////
function openSideMenu() {
  document.getElementById("side-menu").style.width = "100%";
}

function closeSideMenu() {
  document.getElementById("side-menu").style.width = "0";

  document.getElementById("main").style.marginLeft = "0";
}

// ADD STYLES TO HEADER ON SCROLL
const header = document.querySelector(".navigation");
window.onscroll = function () {
  if (
    document.body.scrollTop >= 100 ||
    document.documentElement.scrollTop >= 100
  ) {
    header.classList.add("header-scrolled");
    header.classList.remove("header-default");
  } else {
    header.classList.add("header-default");
    header.classList.remove("header-scrolled");
  }
};

// TEXT ANIMATION
const subTitleText =
  " Learn how to navigate the forex market and achieve your financial goals with our comprehensive online courses and expert guidance.";
let index = 0;
let typingSpeed = 20;

function TYPE() {
  if (index < subTitleText.length) {
    subTitle.innerHTML += subTitleText.charAt(index);
    index++;

    setTimeout(TYPE, typingSpeed);
  }
}
