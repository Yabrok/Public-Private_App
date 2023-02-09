import { useContext } from "react"
import { Private } from "./apps/PrivateApp"
import { Public } from "./apps/PublicApp"
import { AuthContext } from "./context/AuthContext"
import { Login } from "./pages/Login"
import { Posts } from "./pages/Posts"

function App() {
  const {token} = useContext(AuthContext)
  return (
    <div className="App">
      {token ? <Private/> : <Public/>}
    </div>
  )
}

export default App
