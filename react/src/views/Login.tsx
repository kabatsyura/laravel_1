import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () =>{
  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  };

  return (
    <div>
      <p className="text-center mb-4 fs-3">Регистрация</p>
      <form className="d-flex flex-column gap-3" onSubmit={onSubmit}>
        <input className="form-control-lg" type="email" placeholder="Введите email" />
        <input className="form-control-lg" type="password" placeholder="Введите пароль" />
        <button className="btn btn-primary mx-auto fs-5 col-5" type="submit">Вход</button>
      </form>
      <p className="text-center mt-4 fs-6">
        Еще не зарегистрированы?<br/>
        <Link to="/signup">Создайте аккаунт.</Link>
      </p>
    </div>
  )
}

export default Login;
