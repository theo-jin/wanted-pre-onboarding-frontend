import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../components/AuthProvider";
import { signin } from "../hooks/api";

const Signin = () => {
  const { onLogin, setOnLogin } = useContext(AuthContext);
  const [showErr, setShowErr] = useState("이메일과 비밀번호를 입력해주세요");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validInput, setValidInput] = useState(false);

  const navigate = useNavigate();

  // localStorage에 토큰이 있는 상태로 / 페이지에 접속한다면 /todo 경로로 리다이렉트
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/todo");
      return;
    }

    // 로그아웃 직후 localStorage가 비워진 상태로 홈으로 리다이렉트되면 로그아웃 버튼을 회원가입 버튼으로 전환
    setOnLogin(false);
  }, []);

  useEffect(() => {
    setShowErr("이메일과 비밀번호를 입력해주세요");

    // 이메일 및 비밀번호 유효성 검증
    
    if (email.includes("@") && password.length >= 8) setValidInput(true);
    else setValidInput(false);
  }, [email, password]);

  const onSubmit = (e) => {
    e.preventDefault();

    signin(email, password).then((result) => {
      setEmail("");
      setPassword("");
      if (result.access_token) {
        localStorage.setItem("accessToken", result.access_token);
        alert("로그인에 성공했습니다");
        navigate("/todo");
      } else {
        alert("로그인에 실패했습니다.");
      }
    });
  };

  return (
    <main className="page">
      <section className="sigin">
        <article className="header">
          <h2>로그인</h2>
          <p>{showErr}</p>
        </article>
        <article className="board">
          <form action="" onSubmit={onSubmit}>
            <label htmlFor="email">이메일</label>
            <input
              data-testid="email-input"
              type="email"
              placeholder="@ 포함"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">비밀번호</label>
            <input
              data-testid="password-input"
              type="password"
              placeholder="8자 이상"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button data-testid="signin-button" type="submit" disabled={!validInput}>
              로그인
            </button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Signin;
