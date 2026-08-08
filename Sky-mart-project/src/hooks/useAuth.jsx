// hooks me hum apna khud ka custom hook banate hain custom hooks multiple ho sakte hain usage ke according

import { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();

  const { registeredUsers, setRegisteredUsers, loggedInUser, setloggedInUser } =
    useContext(Auth);

  //   login logic hare
  const loginFormSubmit = (data, reset) => {
    let user = registeredUsers.find((val) => {
      return val.email === data.email && val.password === data.password;
    });

    if (!user) {
      toast.error("User Not found or Invalid Credentials");
      return;
    }

    setloggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    toast.success("Login Successfully 🎉");
    navigate("/main", { replace: true });
    if (reset) reset();
  };

  // register logic hare
  const registerFormSubmit = (data, reset) => {
    const userExist = registeredUsers.find((user) => user.email === data.email);
    if (userExist) {
      toast.error("Email already registered!");
      return;
    }

    const { confirmPassword, ...newUser } = data;

    let arr = [...registeredUsers, newUser];
    setRegisteredUsers(arr);
    setloggedInUser(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    localStorage.setItem("registeredUsers", JSON.stringify(arr));
    toast("Account Created Successfully 🎉");
    navigate("/main", { replace: true });
    if (reset) reset();
  };

  // log out logic hare
  const logOutUser = () => {
    localStorage.removeItem("loggedInUser");
    setloggedInUser(null);
    navigate("/", { replace: true });
  };

  return {
    navigate,
    logOutUser,
    loggedInUser,
    loginFormSubmit,
    registerFormSubmit,
  };
};
