import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { resetPassword, signIn, signUp } from "../../store/authSlice";

type Props = {
  activeForm: string;
  from: any;
  navigate: any;
};

export default function useCalbacks({ activeForm, from, navigate }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  return {
    onSubmit: (email: string, password: string) => {
      if (activeForm === "signin") dispatch(signIn({ email, password }));
      else if (activeForm === "signup") dispatch(signUp({ email, password }));
      else if (activeForm === "recover") dispatch(resetPassword({ email }));
    },
    changeForm(pathname: string) {
      navigate(pathname, { replace: true, state: { state: from } });
    },
  };
}
