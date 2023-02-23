import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../auth/context/AuthProvider";
import { TodoContext } from "../context/TodoProvider";
import CreateTodo from "../components/CreateTodo";
import { getTodos } from "../api";
import Todo from "../components/Todo";

const TodoList = () => {
  const { onLogin, setOnLogin } = useContext(AuthContext);
  const { items, setItems } = useContext(TodoContext);
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setTodos(items);
  }, [items.length]);

  useEffect(() => {
  
    // localStorage에 토큰이 없는 상태로 /todo페이지에 접속한다면 / 경로로 리다이렉트
    if (!localStorage.getItem("accessToken")) {
      navigate("/signin");
      return;

    }
    
    // 로그인 직후 리다이렉트되면 회원가입 버튼을 로그아웃으로 변경
    setOnLogin(true);
    getTodos().then((result) => {
      if (result.error) {
        alert(result.message);
        return;
      }
      setTodos(result);
    });
  }, []);

  return (
    <main className="page">
      <section className="todos">
        <article className="list">
          <div className="heading">
            <h2>Todo List</h2>
          </div>
          <article>
          <CreateTodo />
        </article>
          <div className="container">
            {todos.length > 0 &&
              todos.map((el) => {
                const { id, todo, isCompleted, userId } = el;
                return (
                  <Todo
                    key={id}
                    id={id}
                    title={todo}
                    isChecked={isCompleted}
                    onDelete={(id) => {
                      const newTodos = todos.filter((todo) => todo.id !== id);
                      setTodos(newTodos);
                    }}
                  />
                );
              })}
          </div>
        </article>
        
      </section>
    </main>
  );
};

export default TodoList;