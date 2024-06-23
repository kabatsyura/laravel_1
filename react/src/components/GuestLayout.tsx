import { Outlet } from "react-router-dom";

function GuestLayout() {
  return (
    <div>
      Только для гостей сайта
      <Outlet />
    </div>
  )
}

export default GuestLayout;