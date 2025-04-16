import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const isValidToken = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const getRoleFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
};

export const ProtectedRoute = () => {
  const { userLoggedIn } = useAuth();
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAuthenticated = user && token && isValidToken(token) && userLoggedIn;

  return isAuthenticated ? (
    <>
      <Outlet />
      <Navigate to="/choose-persona" replace />
    </>
  ) : (
    <Navigate to="/authentication" replace />
  );
};

export const PlayerProtectedRoute = () => {
  const { userLoggedIn, userRole } = useAuth();
  const token = localStorage.getItem("player");
  const isAuthenticated = token && isValidToken(token) && userLoggedIn;
  const isPlayer =
    isAuthenticated &&
    getRoleFromToken(token) === "player" &&
    userRole === "player";

  return isPlayer ? <Outlet /> : <Navigate to="/authentication" replace />;
};

export const MentorProtectedRoute = () => {
  const { userLoggedIn, userRole } = useAuth();
  const token = localStorage.getItem("user");
  const isAuthenticated = token && isValidToken(token) && userLoggedIn;
  const isMentor =
    isAuthenticated &&
    getRoleFromToken(token) === "mentor" &&
    userRole === "mentor";

  return isMentor ? <Outlet /> : <Navigate to="/authentication" replace />;
};
