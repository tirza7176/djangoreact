import httpService from "./httpservice";
import { jwtDecode } from "jwt-decode";


refreshToken()
function refreshToken() {

    const token = getJwt()
    if (token) {
        httpService.setDefaultCommonHeaders("Authorization", `Bearer ${token}`);
        httpService.setDefaultCommonHeaders("Content-Type", "application/json")
    }
}

function createUser(user) {
    return httpService.post("/auth/register/", user)
}

async function login(credentails) {
    const response = await httpService.post("/auth/login/", credentails)
    /* localStorage.setItem("token", response.data.jwt);*/
    /* setToken(response.data.jwt)*/
    console.log(response.data);


    const token = response.data.jwt;
    if (token) {
        setToken(token);
    } else {
        console.error("No JWT token found in login response");
    }
    return response
}

function setToken(token) {
    localStorage.setItem("token", token)
    refreshToken()
}
console.log("Saved token to localStorage:", localStorage.getItem("token"))

function logout() {

    localStorage.removeItem("token");

    refreshToken()
};

function getJwt() {
    return localStorage.getItem("token")
}
function getUser() {
    try {
        const token = getJwt();
        return jwtDecode(token)
    } catch {
        return null;
    }
}

const userService = {
    createUser,
    login,
    logout,
    refreshToken,
    setToken,
    getJwt,
    getUser,
}

export default userService



