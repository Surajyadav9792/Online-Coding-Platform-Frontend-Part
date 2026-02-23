import {Routes,Route} from "react-router";
import {BrowserRouter} from "react-router"
import HomePage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App(){
  return(
    <>
  <BrowserRouter>     
    <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/sighup" element={<Signup></Signup>}></Route>
     </Routes>   
  </BrowserRouter>
    </>
  )
}
export default App;