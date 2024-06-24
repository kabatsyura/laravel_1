import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/" />
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default GuestLayout;
