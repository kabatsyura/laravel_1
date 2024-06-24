import React, { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from './axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const Signup: React.FC = () =>{
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passConfirmationRef = useRef<HTMLInputElement>(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passRef.current?.value,
      password_conformation: passConfirmationRef.current?.value,
    };

    axiosClient.post('/signup', payload).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
    })
      .catch((err) => {
        const response = err.response;
        const statusOfErr = response.status;
        // 422 - ошибка валидации
        if (response && statusOfErr == 422) {
          console.log(response.data.errors);
        }
      })
  };

  return (
    <div>
      <p className="text-center mb-4 fs-3">Создать аккаунт</p>
      <form className="d-flex flex-column gap-3" onSubmit={onSubmit}>
        <input ref={nameRef} className="form-control-lg" type="text" placeholder="Ваше имя" />
        <input ref={emailRef} className="form-control-lg" type="email" placeholder="Введите email" />
        <input ref={passRef} className="form-control-lg" type="password" placeholder="Введите пароль" />
        <input ref={passConfirmationRef} className="form-control-lg" type="password" placeholder="Повторите пароль" />
        <button className="btn btn-primary mx-auto fs-5 col-5" type="submit">Вход</button>
      </form>
      <p className="text-center mt-4 fs-6">
        Уже зарегистрированы?<br/>
        <Link to="/Login">Зарегистируйтесь.</Link>
      </p>
    </div>
  )
}

export default Signup;
