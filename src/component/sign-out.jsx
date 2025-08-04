import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router";
import { useEffect } from "react";
function Signout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return null;
}
export default Signout;
