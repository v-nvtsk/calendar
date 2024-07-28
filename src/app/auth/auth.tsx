import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthForm } from "../../components/auth-form/auth-form";
import * as selectors from "../../store/selectors/rootSelectors";
import "./style.css";
import useCallbacks from "./use-callbacks";

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const activeForm = params.action || "";
  const from = location.state !== null ? location.state.from : null;

  const callbacks = useCallbacks({ activeForm, from, navigate });
  const authState = useSelector(selectors.authState);

  useLayoutEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      if (location.state && location.state.from !== null) navigate(-1);
      else navigate("/");
    }
  }, [authState.isAuthenticated]);

  if (["signin", "signup", "recover"].includes(activeForm))
    return (
      !authState.isLoading &&
      !authState.isAuthenticated && (
        <div className="page__auth">
          <AuthForm
            activeForm={activeForm}
            onSubmit={callbacks.onSubmit}
            onChangeForm={callbacks.changeForm}
            errorState={authState.errorState}
          />
        </div>
      )
    );

  return <Navigate to="/" replace />;
}
