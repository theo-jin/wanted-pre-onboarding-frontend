import { useState, useEffect, useContext } from "react";

import { createTodo } from "../api";
import { TodoContext } from "../context/TodoProvider";

const CreateTodo = () => {
  const { items, setItems } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [validInput, setValidInput] = useState(false);
  const [todo, setTodo] = useState({});

  useEffect(() => {
    if (title !== "" && title.trim() !== "") setValidInput(true);
    else setValidInput(false);
  }, [title]);

  useEffect(() => {
    const newItems = items.length ? [...items] : [];
    setItems(newItems.concat(todo));
  }, [todo]);

  const onSubmit = (e) => {
    e.preventDefault();
    createTodo(title).then((result) => {
      if (!result.todo) {
        alert(result.message);
        return;
      }
      setTodo(result);
    });
    setTitle("");
  };

  return (
    <section className="addTodo">
      <form onSubmit={onSubmit}>
        <input
          data-testid="new-todo-input"
          type="text"
          id="todo"
          name="todo"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
        data-testid="new-todo-add-button"
        type="submit" 
        disabled={!validInput}>
          추가
        </button>
      </form>
    </section>
  );
};

export default CreateTodo;
