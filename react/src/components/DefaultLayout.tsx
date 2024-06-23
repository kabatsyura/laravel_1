import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function DefaultLayout() {

  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      Только для пользователей приложения
      <Outlet />
    </div>
  )
}

export default DefaultLayout;