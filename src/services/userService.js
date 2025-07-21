import httpService from "./httpservice";
import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = "token";
refreshToken()

function createUser(user) {
    delete axios.defaults.headers.common["Authorization"]
    return httpService.post("/auth/register/", user)

}

async function login(credentials) {
    console.log("Logging in with:", credentials);
    try {
        const response = await httpService.post("/auth/login/", credentials)

        const token = response.data.access;
        console.log("Login response:", response.data);
        setToken(token)
        console.log(token);

        return response
    } catch (error) {
        if (error.response) {
            console.error("Login failed:", error.response.status, error.response.data);
        } else {
            console.error("Login failed (no response):", error);
        }
        throw error;

    }
}
function logout() {
    setToken(null)
}
function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    refreshToken()
}

function refreshToken() {
    const token = getJwt();
    if (token) {
        httpService.setDefaultCommonHeaders("Authorization", `Bearer ${token}`)
    }
    else {
        httpService.setDefaultCommonHeaders("Authorization", null);
    }
}

function getJwt() {
    return localStorage.getItem(TOKEN_KEY)
}

function getUser() {
    try {
        const token = getJwt();
        return jwtDecode(token);
    }
    catch {
        return null
    }
}
const userService = {
    createUser,
    login,
    refreshToken,
    logout,
    setToken,
    getJwt,
    getUser,
}

export default userService;