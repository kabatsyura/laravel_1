import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/" />
  }

  return (
    <div>
      Только для гостей сайта
      <Outlet />
    </div>
  );
}

export default GuestLayout;
