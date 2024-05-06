import "./style.css";
import year from "./year-view.jpg";

export function Main() {
  return (
    <main className="page__home">
      <div className="container home__wrapper">
        <div className="content-frame">
          <h1>Календарь</h1>
          <img src={year} alt="" width="800" height="500" />
          <p>Приложение поддерживает регистрацию новых пользователей по email и паролю</p>
        </div>
      </div>
    </main>
  );
}
