
// createTodo API
export const createTodo = async (todo) => {
  try {
    const res = await fetch(
      "https://pre-onboarding-selection-task.shop/todos",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      },
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// getTodos API
export const getTodos = async () => {
  try {
    const res = await fetch(
      "https://pre-onboarding-selection-task.shop/todos",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// updateTodo API
export const updateTodo = async (id, todo, isCompleted) => {
  try {
    const res = await fetch(
      `https://pre-onboarding-selection-task.shop/todos/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo,
          isCompleted,
        }),
      },
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// deleteTodo API
export const deleteTodo = async (id) => {
  try {
    const res = await fetch(
      `https://pre-onboarding-selection-task.shop/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    );
  } catch (err) {
    console.error(err);
  }
};