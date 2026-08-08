import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("registeredUsers")) || [],
  );
  const [loggedInUser, setloggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")),
  );
  console.log("registered user ->", registeredUsers);
  console.log("loggedin user ->", loggedInUser);

  return (
    <Auth.Provider
      value={{
        registeredUsers,
        setRegisteredUsers,
        loggedInUser,
        setloggedInUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
