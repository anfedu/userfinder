import React, { useReducer, createContext } from "react";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenStorage = localStorage.getItem("token");
      setToken(tokenStorage);
    }
  }, []);

  function login(userData) {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, token }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
