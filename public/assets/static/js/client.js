// Debugging
const LOG = console.log;

// Selectors
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#username");
const registrationButton = document.querySelector("#registration-form-btn");
const loginButton = document.querySelector("#login-form-btn");

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

class Client {
  // Register a user
  static async registerUser() {
    const FORM_STATE = Utils.validateFormInput();
    
    if (FORM_STATE) {
        LOG(FORM_STATE);
    } else {
        LOG(FORM_STATE);
    }

    const PAYLOAD = {
      username: usernameInput.value,
      email: emailInput.value,
      password: emailInput.value,
    };

    // LOG(PAYLOAD);

    // // PAYLOAD <OPTIONS>
    // const OPTIONS = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(PAYLOAD),
    // };

    // const RESPONSE = await fetch(ENDPOINTS.REGISTRATION, OPTIONS);
    // const USER_RESPONSE = await RESPONSE.json();

    // // [DEBUG] logs
    // LOG(USER_RESPONSE);

    event.preventDefault();
  }

  static getUsers() {}

  static async fetchData() {
    const RESPONSE = await fetch(ENDPOINTS.GET_USERS.trim());
    const USERS = await RESPONSE.json();
    LOG(USERS);
  }
}

/**
 * This class contains [Utility] methods
 */
class Utils {
  // Reset form fields
  static resetForm() {
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  }

  // Validate form
  static validateFormInput() {
    if (
      usernameInput.value.trim().length > 0 &&
      emailInput.value.trim().length > 0 &&
      passwordInput.value.trim().length > 0
    ) {
      console.log("TRUE");
      return true;
    } else {
      console.log("FALSE");
      return false;
    }
  }
}
