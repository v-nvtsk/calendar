import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "../components/header/header";
import { Private } from "../containers/private";
import { AppDispatch, StoreRootState } from "../store";
import { AuthState, checkAuth, signOut } from "../store/authSlice";
import { Auth } from "./auth/auth";
import { Calendar } from "./calendar/calendar";
import { Main } from "./main/main";
import { Profile } from "./profile/profile";
import "./style.css";
import { Task } from "./task";

function App() {
  sessionStorage.getItem("token");

  const authState = useSelector<StoreRootState>((state) => state.auth) as AuthState;
  const { isLoading, isAuthenticated } = authState;
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(checkAuth());
  }, []);

  const callbacks = {
    onSignOut() {
      dispatch(signOut());
    },
  };

  return (
    !isLoading && (
      <>
        <Header onSignOut={callbacks.onSignOut} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="calendar/:view?"
            element={
              <Private isAuthenticated={isAuthenticated}>
                <Calendar />
              </Private>
            }
          />
          <Route path="auth/:action" element={<Auth />} />
          <Route path="/task/:action?" element={<Task />} />
          <Route
            path="profile"
            element={
              <Private isAuthenticated={isAuthenticated}>
                <Profile />
              </Private>
            }
          />
          <Route path="*" element={<Main />} />
        </Routes>
      </>
    )
  );
}

export default App;
