import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const outlet = <Outlet />;
  const navigate = <Navigate to="/" state={{ from: location }} replace />;

  return token ? outlet : navigate;
};
export default RequireAuth;
