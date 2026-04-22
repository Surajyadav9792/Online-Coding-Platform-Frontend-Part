import {Routes, Route ,Navigate} from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";
import { useEffect } from "react";
import AdminPanel from "./component/AdminPanel";
import ProblemPage from "./pages/ProblemPage";
import Admin from "./pages/Admin";
import AdminDelete from "./component/Admindelete";
import AdminVideo from "./component/AdminVideo";
import AdminUpload from "./component/AminUpload";


function App(){
  const dispatch = useDispatch();
  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  //if our loading is happen then a loading spinner is appears
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return(
  <>
    <Routes>
      <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
      <Route path="/admin" element={isAuthenticated && user?.role==='admin'? <Admin /> :<Navigate to="/"/>}></Route>
      <Route path="/admin/create" element={isAuthenticated && user?.role==='admin'? <AdminPanel /> :<Navigate to="/"/>}></Route>
      <Route path="/admin/delete" element={isAuthenticated && user?.role==='admin'? <AdminDelete /> :<Navigate to="/"/>}></Route>
      <Route path="/problemById/:id" element={<ProblemPage />} />
      <Route path="/admin/video" element={isAuthenticated && user?.role==='admin'? <AdminVideo /> :<Navigate to="/"/>}></Route>
      <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role==='admin'? <AdminUpload />:<Navigate to="/"/>}></Route>
    
      {/* <Route 
        path="/admin" 
        element={
          isAuthenticated && user?.role === 'admin' ? 
            <AdminPanel /> : 
            <Navigate to="/" />
        } 
      /> */}
    </Routes>
  </>
  )
}

export default App;