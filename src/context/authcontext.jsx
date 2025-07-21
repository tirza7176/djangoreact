import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import userService from "../services/userService";
import httpService from "../services/httpservice";
export const AuthContext = createContext();

AuthContext.displayName = "Auth";
export function AuthProvider({ children }) {
  // const [user, setUser] = useState(userService.getUser());
  const [user, setUser] = useState(null);
  useEffect(() => {
    // // const token = localStorage.getItem("token");
    // const response =
    // if (token) {
    //   httpService.setDefaultCommonHeaders("Authorization", `Bearer ${token}`)
    // }
    const loadUser = async () => {
      try {
        const response = userService.getUser();
        setUser(response);
        return response;
      } catch (err) {
        console.log(err);
      }
    };
    loadUser();
  }, []);

  //
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
