import { Link } from "react-router-dom"


export const PublicHeader = () => {

  return(
    <>
      <header className="bg-dark py-3">
        <div className="container">
          <div className="d-flex align-items-center">
            <Link className="h2 text-decoration-none text-white" to='/'>Logo</Link>

            <div className="ms-auto">
              <Link to='/login' className="btn btn-success me-2">Sign In</Link>
              <Link to='/register' className="btn btn-warning">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  ) 
}