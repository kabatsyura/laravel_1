import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function DefaultLayout() {

  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div className="container">
      <aside className="row">
        <Link to="/dashboard" className="col-3">Главная</Link>
        <Link to="/user"className="col-3">Пользователь</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            CRUD от Дмитрия
          </div>
        </header>
        <main>
          User
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout;