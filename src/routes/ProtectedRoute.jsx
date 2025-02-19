import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};
const UserProtectedRoute = ({ children }) => {
  const { user, role } = useAuth();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  if (role !== "user") {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

const Level1ProtectedRoute = ({ children }) => {
  const { user, role } = useAuth();
  if (!user) {
    return <Navigate to="/staffsignin" />;
  }

  if (role !== "level1") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const Level2ProtectedRoute = ({ children }) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/staffsignin" />;
  }

  if (role !== "level2") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
Level1ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
Level2ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
UserProtectedRoute.propTypes = {
  children: PropTypes.node,
};
ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
export {
  UserProtectedRoute,
  Level1ProtectedRoute,
  Level2ProtectedRoute,
  ProtectedRoute,
};
