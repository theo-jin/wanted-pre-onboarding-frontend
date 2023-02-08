import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import './index.css';
import AuthProvider from "./components/AuthProvider";
import TodoProvider from "./components/TodoProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <TodoProvider>
      <App />
    </TodoProvider>
  </AuthProvider>,
);