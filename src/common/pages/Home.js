import React, { useEffect,useContext } from "react";
import { useNavigate,Link } from "react-router-dom";

import { AuthContext } from "../../auth/context/AuthProvider";


const Home = () => {
  const { onLogin, setOnLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  // localStorage에 토큰이 있는 상태로 '/' 페이지에 접속시 '/todo'로  리다이렉트
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/todo");
      return;
    }
    setOnLogin(false);
  }, []);

  return (
    <main className="page">
      
    <article className="header">
       <Link className="link" to="/signin">
        <h2 className="btn">My ToDo List 로그인</h2>    
      </Link>
      </article>  
    
    </main> 

  );
};

export default Home;
