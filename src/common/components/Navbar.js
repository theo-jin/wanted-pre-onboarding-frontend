import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthProvider";

import classes from './Navbar.module.css'

const Navbar = () => {
  const { onLogin } = useContext(AuthContext);
  const [isLogged, setIsLogged] = useState(onLogin);

  const showButton = () => {
    return onLogin ? (
          <Link className="link" to="/">
        <p
          className="btn"
          onClick={() => {
            localStorage.clear();
          }}
        >
          로그아웃
        </p>
      </Link>
    ) : (
        <Link className="link" to="/signup">
        <p className="btn">회원가입</p>
      </Link>
      
    );
  };

  useEffect(() => {
    showButton();
  }, [isLogged]);

  return (
    <header className={classes.header}>
        <Link className="link" to="/">
          <h2 className={classes.logo}>My ToDo List</h2>
        </Link>
         {showButton()}
      </header>
  );
};

export default Navbar;