import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "redux/actions/authActions";

const useAuth = () => {
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  }, [dispatch]);

  const setAutoLogout = useCallback(
    (milliseconds: number) => {
      setTimeout(() => {
        logoutHandler();
      }, milliseconds);
    },
    [logoutHandler]
  );

  return { setAutoLogout, logoutHandler };
};

export default useAuth;
