import { PublicHeader } from "../components/PublicHeader/PublicHeader"
import { Route, Routes } from "react-router-dom"
import { PublicHome } from "../pages/PublicHome/PublicHome"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register/Register"
import { Posts } from "../pages/Posts"


export const Public = () => {

  return(
    <>
      <PublicHeader/>

      <div className="container">
        <Routes>
          <Route index path="/" element={<PublicHome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<h1 className="fw-bold display-1">404</h1>}/>
        </Routes>
      </div>
    </>
  )
}