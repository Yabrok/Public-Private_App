import { PrivateHeader } from "../components/PrivateHeader/PrivateHeader"
import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register/Register"
import { Posts } from "../pages/Posts"
import { PrivateHome } from "../pages/PrivateHome/PrivateHome"
import { Users } from "../pages/Users"
import { TodoList } from "../pages/Todo/Todo"
export const Private = () => {

  return (
    <>
      <PrivateHeader />
      <div className="container">
        <Routes>
          <Route index path="/" element={<PrivateHome />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1 className="fw-bold display-1">404</h1>} />
        </Routes>
      </div>
    </>
  )
}