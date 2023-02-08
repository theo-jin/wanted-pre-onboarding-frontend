import React, { useState } from "react";
import classes from "./Todo.module.css"
import { deleteTodo, updateTodo } from "../hooks/api";

const Todo = ({ id, title, isChecked, onDelete = (f) => f }) => {
  const [todo, setTodo] = useState(title);
  const [tempTodo, setTempTodo] = useState("");
  const [isCompleted, setIsCompleted] = useState(isChecked);

  //  Todo List 수정모드 제어하는 상태
  const [onEdit, setOnEdit] = useState(false);

  // Todo List수정모드 활성화/비활성화 버튼
  const onClickEdit = () => {
    if (onEdit) {
      updateTodo(id, todo, isCompleted).then((result) => {
        if (result.error) {
          alert(result.message);
        }
        setTempTodo("");
        setOnEdit(false);
      });
    } else {
      setTempTodo(todo);
      setOnEdit(true);
    }
  };

  const onClickDelete = () => {
    // 수정 모드시 수정 내용 취소
    if (onEdit) {
      setOnEdit(false);
      return;
    }
    // Todo List 삭제
    deleteTodo(id);
    onDelete(id);
  };

  return (
        <li className={classes.todo}>
      <article className="item">
        <input
          className="checkbox"
          type="checkbox"
          checked={isCompleted}
          onClick={() => setIsCompleted(!isCompleted)}
        />
        {onEdit ? (
          <input
            data-testid="modify-input"
            className="edit"
            type="text"
            placeholder={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        ) : (
          <span
            style={
              isCompleted
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
          {todo}
          </span>
        )}
      </article>
      <article className="btn-container">
    {onEdit ? (
        <section>
         <button className="btn-submit" data-testid="submit-button" onClick={onClickEdit}>
           제출
          </button>
          <button className="btn-cancel" data-testid="cancel-button" onClick={onClickDelete}>
           취소
            </button>
            </section>
    )
           :   ( <section>
           <button className="btn-edit" data-testid="modify-button" onClick={onClickEdit}>
           수정
            </button>
            <button className="btn-delete" data-testid="delete-button" onClick={onClickDelete}>
             삭제
              </button>
              </section>
           )
        }
      </article>
    </li>
  );
};

export default Todo;