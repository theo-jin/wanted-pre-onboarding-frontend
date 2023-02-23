import React, { useEffect, useState, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";


import { AuthContext } from "../context/AuthProvider";

const Signup = () => {
  const [showErr, setShowErr] = useState("이메일과 비밀번호를 입력해주세요");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validInput, setValidInput] = useState(false);
  const { onLogin, setOnLogin } = useContext(AuthContext);

  const navigate = useNavigate();

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
    if (
      email.includes("@") &&
      password.length >= 8 &&
      passwordConfirm.length >= 8
    )
      setValidInput(true);
    else setValidInput(false);
  }, [email, password, passwordConfirm]);

  const onSubmit = (e) => {
    e.preventDefault();
      if (password !== passwordConfirm) {
      setShowErr("비밀번호가 일치하지 않습니다");
      return;
    }
    signup(email, password).then((result) => {
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      if (result.error) {
        alert(result.message);
      } else {
        alert("회원 가입이 완료되었습니다");
        navigate("/signin");
      }
    });
  };

  return (
    <main className="page">
      <section className="signup">
        <article className="header">
          <h2>회원가입</h2>
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
            <label htmlFor="passConfirm">비밀번호 확인</label>
            <input
              type="password"
              placeholder="8자 이상"
              id="passConfirm"
              name="passConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            <button data-testid="signup-button" disabled={!validInput}>
              계정 생성
            </button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Signup;