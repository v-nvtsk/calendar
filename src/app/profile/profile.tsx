import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { signOut, updateEmail } from "../../store/authSlice";
import { rootSelectors } from "../../store/selectors";
import { getData } from "../../store/userSlice";
import styles from "./style.module.css";

export function Profile() {
  const dispatch = useDispatch<AppDispatch>();

  const userData = useSelector(rootSelectors.userData);

  useEffect(() => {
    dispatch(getData());
  }, []);

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const emailEl = form.elements.namedItem("email") as HTMLInputElement;
    const email = emailEl.value as string;
    dispatch(updateEmail({ newEmail: email }));
    dispatch(signOut());
  };

  return (
    <>
      {!userData.isLoading && (
        <main className={styles.page__profile}>
          <div className="container">
            <h1>Profile</h1>
            <div>
              <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">email:</label>
                  <input type="email" name="email" id="email" defaultValue={userData.user?.email || ""} />
                </div>
                <p>INFO: You will be signed out after email change</p>
                <button className={styles.btn} type="submit">
                  Change email
                </button>
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
