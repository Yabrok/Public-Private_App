import { useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { UserContext } from "../../context/UserContext"

export const PrivateHeader = () => {

  const{setUser} = useContext(UserContext);
  const{setToken} = useContext(AuthContext);

  const navigate = useNavigate()

  return(
    <>
      <header className="bg-dark py-3">
        <div className="container">
          <div className="d-flex align-items-center">
            <Link className="h2 text-decoration-none text-white" to='/'>Logo</Link>

            <div className="ms-5">
              <NavLink to='/posts' 
              className={({isActive})=> 
              isActive ? 'text-white fw-bold h5 me-3' 
              : 'text-white fw-bold h5 me-3 text-decoration-none'}>Post</NavLink>
              <NavLink to='/users' className={({isActive})=> 
              isActive ? 'text-white fw-bold h5 me-3' 
              : 'text-white fw-bold h5 me-3 text-decoration-none'}>Users</NavLink>
              <NavLink to='/todo' className={({isActive})=> 
              isActive ? 'text-white fw-bold h5 me-3' 
              : 'text-white fw-bold h5 me-3 text-decoration-none'}>Todo</NavLink>
            </div>

            <button onClick={()=> {
              setUser('')
              setToken('')
              navigate('/')
            }} className="ms-auto btn btn-danger" type="button">Logout</button>
          </div>
        </div>
      </header>
    </>
  )
}