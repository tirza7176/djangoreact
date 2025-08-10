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

async function renewAccessToken() {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    if (!refreshTokenValue) return;

    try {
        const response = await httpService.post("/token/refresh/", {
            refresh: refreshTokenValue
        });
        const newAccessToken = response.data.access;
        setToken(newAccessToken);
        console.log("Access token refreshed!");
    } catch (error) {
        console.error("Failed to refresh token", error);
        logout();
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


    const accessToken = response.data.access;
    const refreshTokenValue = response.data.refresh;
    if (accessToken) {
        setToken(accessToken);
        localStorage.setItem("refreshToken", refreshTokenValue);
    } else {
        console.error("No access token found in login response");
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
    localStorage.removeItem("refreshToken");
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
    renewAccessToken,
}

export default userService



