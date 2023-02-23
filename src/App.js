import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";


import Layout from "./common/components/Layout";
import Home from "./common/pages/Home";
import Signin from "./auth/pages/Signin";
import Signup from "./auth/pages/Signup";
import TodoList from "./todo/pages/TodoList"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;