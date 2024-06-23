import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

function DefaultLayout() {

  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div className="container d-flex">
      <aside className="row bg-primary col-2 vh-100 flex-column">
        <Link to="/dashboard" className="mt-5 text-white">Главная</Link>
        <Link to="/user" className="text-white">Пользователь</Link>
      </aside>
      <div className="row col-10 mx-auto h-25">
        <header className="bg-light">
          <div>
            CRUD от Дмитрия
          </div>
        </header>
        <main className="mx-auto d-flex justify-content-center mt-5 vh-100">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout;