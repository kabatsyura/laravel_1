/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext, useContext, useState} from "react";

interface AppStateContextType {
  user: any | null;
  token: string | null;
  setUser: (user: any | null) => void;
  setToken: (token: string | null) => void;
}

// Создание контекста с указанием типа AppStateContextType
const StateContext = createContext<AppStateContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({children: any}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (token: any) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }


  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);