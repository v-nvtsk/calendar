import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

type HeaderProps = {
  isAuthenticated: boolean;
  onSignOut: () => void;
};

export function Header({ isAuthenticated, onSignOut }: HeaderProps): React.ReactElement {
  const signOutHandler = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    onSignOut();
  };

  return (
    <header className="page__header header">
      <div className="container">
        <div className="header__logo_text">
          <NavLink className="header__logo-link" to="/">
            🗓️
          </NavLink>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__list-item">
              <NavLink className="nav__link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink className="nav__link" to="calendar">
                Calendar
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink className="nav__link" to="about">
                About
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav__list-item">
                <NavLink className="nav__link" to="profile">
                  Profile
                </NavLink>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav__list-item">
                <NavLink className="nav__link" to="auth/signin">
                  Sign In
                </NavLink>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav__list-item">
                <NavLink className="nav__link" to="auth/signup">
                  Sign Up
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav__list-item">
                <NavLink className="nav__link" to="auth/signout" onClick={signOutHandler}>
                  Sign Out
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
