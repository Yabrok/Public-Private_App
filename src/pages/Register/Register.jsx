import axios from "axios"
import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export const Register = () => {
  const{setToken} = useContext(AuthContext)

  const navigate = useNavigate()

  const nameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post('http://localhost:6060/register', {
        "firstname": nameRef.current.value,
        "email": emailRef.current.value,
        "password": passwordRef.current.value,
      })
      .then((data) => {
        if(data.status == 201){
          setToken(data.data.accessToken)
          localStorage.setItem('user', JSON.stringify(data.data.user))
          navigate('/')
        }
      })
      .catch((err) => console.log(err))

  }


  return (
    <>
      <div className="pt-5">
        <form onSubmit={handleSubmit} className="w-50 mx-auto p-5 rounded-3 shadow-lg">
          <h2 className="h1 text-center fw-bold mb-4">Register</h2>
          <input ref={nameRef} defaultValue='Nosir'
            className="form-control w-75 mx-auto mb-3" type="text" placeholder="Name" />
          <input ref={emailRef} defaultValue='eve.holt@reqres.in'
            className="form-control w-75 mx-auto mb-3" type="email" placeholder="Email" />
          <input ref={passwordRef} defaultValue='cityslicka'
            className="form-control w-75 mx-auto mb-3" type="password" placeholder="Password" />

          <div className="ms-5 ps-3">
            <button className="btn btn-primary ms-1" type="submit">Send</button>
          </div>
        </form>
      </div>
    </>
  )
}