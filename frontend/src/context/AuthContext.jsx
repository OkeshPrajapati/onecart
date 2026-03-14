import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthDataContext = createContext();

function AuthProvider({ children }) {
  const serverUrl = "https://onecart-backend-27mo.onrender.com"
 
  return (
    <AuthDataContext.Provider value={{serverUrl}}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthProvider;
