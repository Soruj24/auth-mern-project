import { Outlet } from "react-router-dom"
import Header from "./Layout/Header"


function App() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
