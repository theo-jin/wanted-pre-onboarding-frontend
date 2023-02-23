import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import './index.css';
import AuthProvider from "./auth/context/AuthProvider";
import TodoProvider from "./todo/context/TodoProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <TodoProvider>
      <App />
    </TodoProvider>
  </AuthProvider>,
);