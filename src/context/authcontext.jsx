import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import userService from "../services/userService";
import httpService from "../services/httpservice";
export const AuthContext = createContext();

AuthContext.displayName = "Auth";
export function AuthProvider({ children }) {
  const [user, setUser] = useState(userService.getUser());
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpService.setDefaultCommonHeaders("Authorization", `Bearer ${token}`);
    }
  }, []);

  const refreshUser = () => setUser(userService.getUser());
  const loginWithToken = (user, token) => {
    localStorage.setItem("token", token);
    setUser(user); // שמרי גם את המשתמש מהתגובה של הרישום
    httpService.setDefaultCommonHeaders("Authorization", `Bearer ${token}`);
  };
  const login = async (credentials) => {
    const response = await userService.login(credentials);
    refreshUser();
    return response;
  };
  const logout = () => {
    userService.logout();
    refreshUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        createUser: userService.createUser,
        loginWithToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
