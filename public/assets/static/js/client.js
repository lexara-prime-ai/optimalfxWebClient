// Debugging
const LOG = console.log;

// Selectors
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
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
  // Register a user
  static async registerUser() {
    try {
      if (
        usernameInput.value.length == 0 &&
        emailInput.value.length == 0 &&
        passwordInput.value.length == 0
      ) {
        event.preventDefault();
        LOG("Form [VALIDATION] failed");
      } else {
        const PAYLOAD = {
          username: usernameInput.value || null,
          email: emailInput.value || null,
          password: passwordInput.value || null,
        };

        // [DEBUG] logs
        LOG({ username: PAYLOAD.username, email: PAYLOAD.email });

        // PAYLOAD <OPTIONS>
        const OPTIONS = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(PAYLOAD),
        };

        const RESPONSE = await fetch(ENDPOINTS.REGISTRATION, OPTIONS);
        const USER_RESPONSE = await RESPONSE.json();

        // [DEBUG] logs
        LOG(USER_RESPONSE);

        // Redirect user to [LOGIN] page.
        window.location.href =
          "http://localhost:5500/web_client/public/assets/pages/login.html";
      }
    } catch (error) {
      ErrorHandling.propagateError(error, "registerUser");
    }
  }


  // User login
  static async userLogin() {
    try {
      if (
        usernameInput.value.length == 0 &&
        // emailInput.value.length == 0 &&
        passwordInput.value.length == 0
      ) {
        event.preventDefault();
        LOG("Form [VALIDATION] failed");
      } else {
        const PAYLOAD = {
          username: usernameInput.value || null,
        //   email: emailInput.value || null,
          password: passwordInput.value || null,
        };

        // [DEBUG] logs
        LOG({ username: PAYLOAD.username});

        // PAYLOAD <OPTIONS>
        const OPTIONS = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(PAYLOAD),
        };

        const RESPONSE = await fetch(ENDPOINTS.LOGIN, OPTIONS);

        // [DEBUG] logs
        LOG(RESPONSE);

        
      }
    } catch (error) {
      ErrorHandling.propagateError(error, "userLogin");
    }
  }

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
}
