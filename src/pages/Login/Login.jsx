import axios from "axios"
import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { UserContext } from "../../context/UserContext"

export const Login = () => {

  const emailRef = useRef('')
  const passwordRef = useRef('')

  const{setToken} = useContext(AuthContext)
  const{setUser} = useContext(UserContext)


  const navigate = useNavigate()


  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post('http://localhost:6060/login', {
        "email": emailRef.current.value,
        "password": passwordRef.current.value,
      })
      .then((data) => {
        if(data.status == 200){
          setToken('token', data.data.accessToken)
          setUser('user', JSON.stringify(data.data.user))
          navigate('/')
        }
      })
      .catch((err) => console.log(err))

  }


  return (
    <>
      <div className="pt-5">
        <form onSubmit={handleSubmit} className="w-50 mx-auto p-5 rounded-3 shadow-lg">
          <h2 className="h1 text-center fw-bold mb-4">Login</h2>
          <input ref={emailRef} defaultValue='eve.holt@reqres.in'
            className="form-control w-75 mx-auto mb-3" type="email" placeholder="Email" />
          <input ref={passwordRef} defaultValue='cityslicka'
            className="form-control w-75 mx-auto mb-3" type="password" placeholder="Password" />

          <div className="ms-1 ps-5">
            <button className="btn btn-primary ms-3" type="submit">Send</button>
          </div>
        </form>
      </div>
    </>
  )
}