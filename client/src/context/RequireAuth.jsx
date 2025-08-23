import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const RequireAuth = ({ children }) => {
  const { user, isLoading } = useAuth();

  //console.log("RequireAuth – user:", user, "– loading:", isLoading);

  if (isLoading) {
    // Optionally show a spinner or loader
    return null;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
