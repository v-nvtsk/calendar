import "./style.css";

export function Main() {
  return (
    <main className="page__home">
      <div className="container home__wrapper">
        <div className="content-frame">
          <h1>"Календарь событий с авторизацией"</h1>
          <p>Выполнено с применением технологий:</p>
          <ul>
            <li>Typescript</li>
            <li>React</li>
            <li>Redux (react-redux, redux/toolkit)</li>
            <li>React-router</li>
            <li>Jest</li>
            <li>Playwright</li>
            <li>React-testing-library</li>
            <li>Firebase</li>
          </ul>
          <p>Приложение поддерживает регистрацию новых пользователей</p>
          <p>Хранение данных в Firebase осуществляется раздельно для каждого пользователя</p>
          <p>Авторизация пользователей выполнена с использованием email и пароля</p>
        </div>
      </div>
    </main>
  );
}
