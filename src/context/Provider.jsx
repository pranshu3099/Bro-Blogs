import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [responseData, setRes] = useState({});
  const [isloggedout, setIsLoggedOut] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        responseData,
        setRes,
        isloggedout,
        setIsLoggedOut,
        searchUser,
        setSearchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("component should be bounded inside the context");
  }
  return context;
}

export { AuthProvider, useAuthContext };
