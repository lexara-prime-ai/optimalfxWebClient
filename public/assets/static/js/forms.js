// Debugging
const LOG = console.log;

// Selectors
const countryInput = document.querySelector("#country");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const registrationButton = document.querySelector("#registration-form-btn");
const loginButton = document.querySelector("#login-form-btn");
const proceedButton = document.querySelector("#proceed-form-btn");

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
  ////////////////////////////////
  ////// [USER] REGISTRATION /////
  ///////////////////////////////
  static async registerUser() {
    try {
      if (
        countryInput.value.length == 0 &&
        usernameInput.value.length == 0 &&
        emailInput.value.length == 0 &&
        passwordInput.value.length == 0
      ) {
        Toastify({
          text: "Please fill in the required fields !",
          duration: 3000,
          newWindow: true,
          close: false,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#e23939",
            color: "#ffffff",
            borderRadius: "9px",
            fontWeight: "700",
            letterSpacing: "1px",
            textTransform: "capitalize",
          },
          // Handle callback after click.
          onClick: function () {},
        }).showToast();
        event.preventDefault();
        LOG("Form [VALIDATION] failed");
      } else {
        const PAYLOAD = {
          country: countryInput.value || null,
          username: usernameInput.value || null,
          email: emailInput.value || null,
          password: passwordInput.value || null,
        };

        // [DEBUG] logs
        // LOG({ username: PAYLOAD.username, email: PAYLOAD.email });

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

        if (RESPONSE.status == 200) {
          Toastify({
            text: "Registration Successful",
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "#144681",
              color: "#ffffff",
              borderRadius: "9px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "capitalize",
            },
            // Handle callback after click.
            onClick: function () {},
          }).showToast();

          // Enable [PROCEED] button
          proceedButton.classList.add("visible");
          // Redirect user to [LOGIN] page.
          // window.location.href =
          //   "http://localhost:5500/web_client/public/assets/pages/login.html";
        } else if (RESPONSE.status == 400) {
          Toastify({
            text: "Registration Failed !",
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "#e23939",
              color: "#ffffff",
              borderRadius: "9px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "capitalize",
            },
            // Handle callback after click.
            onClick: function () {},
          }).showToast();

          proceedButton.classList.remove("visible");
        }
      }
    } catch (error) {
      Toastify({
        text: "Registration Failed !",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#e23939",
          color: "#ffffff",
          borderRadius: "9px",
          fontWeight: "700",
          letterSpacing: "1px",
          textTransform: "capitalize",
        },
        // Handle callback after click.
        onClick: function () {},
      }).showToast();
      ErrorHandling.propagateError(error, "registerUser");
    }
  }

  //////////////////////////
  ////// [USER] LOGIN /////
  ///////////////////////
  static async userLogin() {
    try {
      if (usernameInput.value.length == 0 && passwordInput.value.length == 0) {
        Toastify({
          text: "Please fill in the required fields !",
          duration: 3000,
          newWindow: true,
          close: false,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#e23939",
            color: "#ffffff",
            borderRadius: "9px",
            fontWeight: "700",
            letterSpacing: "1px",
            textTransform: "capitalize",
          },
          // Handle callback after click.
          onClick: function () {},
        }).showToast();
        event.preventDefault();
        LOG("Form [VALIDATION] failed");
      } else {
        const PAYLOAD = {
          username: usernameInput.value || null,
          password: passwordInput.value || null,
        };

        // [DEBUG] logs
        LOG(`Loging in: { username: ${PAYLOAD.username} }`);

        // PAYLOAD <OPTIONS>
        const OPTIONS = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(PAYLOAD),
        };

        const RESPONSE = await fetch(ENDPOINTS.LOGIN, OPTIONS);

        // Check [RESPONSE] status
        if (RESPONSE.status == 400) {
          Toastify({
            text: "Invalid credentials !",
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "#b82d2d",
              color: "#ffffff",
              borderRadius: "9px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "capitalize",
            },
            // Handle callback after click.
            onClick: function () {},
          }).showToast();

          LOG("Please provide [VALID] credentials...");
        } else if (RESPONSE.status == 200) {
          const SESSION_TOKEN = await RESPONSE.json();

          // Add [TOKEN] to localstorage
          localStorage.setItem("SESSION_TOKEN", SESSION_TOKEN.TOKEN);

          Toastify({
            text: "Login Successful",
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "#144681",
              color: "#ffffff",
              borderRadius: "9px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "capitalize",
            },
            // Handle callback after click.
            onClick: function () {},
          }).showToast();

          // Enable [PROCEED] button
          if (localStorage.getItem("SESSION_TOKEN")) {
            proceedButton.classList.add("visible");
          } else {
            proceedButton.classList.remove("visible");
          }
        }
      }
    } catch (error) {
      ErrorHandling.propagateError(error, "userLogin");
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

class App {
  static verifySessionStatus() {
    // Enable [PROCEED] button
    if (localStorage.getItem("SESSION_TOKEN")) {
      proceedButton.classList.add("visible");
    } else {
      proceedButton.classList.remove("visible");
    }
  }
}

App.verifySessionStatus();
