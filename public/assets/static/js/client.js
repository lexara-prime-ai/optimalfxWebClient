
const ENDPOINTS = Object.freeze({
    // Authenticatio
    REGISTRATION: 'http://localhost:5000/api/Auth/register',
    LOGIN: 'http://localhost:5000/api/Auth/login',
    // Users
    ADD_USER: 'http://localhost:5000/api/User',
    UPDATE_USER: 'http://localhost:5000/api/User',
    DELETE_USER: 'http://localhost:5000/api/User',
    GET_USER: 'http://localhost:5000/api/User',
    GET_USERS: 'http://localhost:5000/api/User',
    // Courses
    ADD_COURSE: 'http://localhost:5000/api/Course',
    UPDATE_COURSE: 'http://localhost:5000/api/Course',
    DELETE_COURSE: 'http://localhost:5000/api/Course',
    GET_COURSE: 'http://localhost:5000/api/Course',
    GET_COURSES: 'http://localhost:5000/api/Course'
})

class Client {
    // Register a user
    static registerUser() {
        console.log(ENDPOINTS.REGISTRATION);
    }
}
