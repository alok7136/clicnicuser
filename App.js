import react from "react";
import "./App.css"
import Patient from "./patientreg";
import ViewPatient from "./viewpatient";
import Registration from "./registration";
import Login from "./login";
import { Link ,BrowserRouter,Route,Routes} from "react-router-dom";
export default class App extends react.Component
{
render(){
return <div>
  <BrowserRouter>
  {/* <Link to="/home"><b>Add Patient</b></Link>&nbsp;&nbsp;&nbsp; */}
  {/* <Link to="/view"><b>View Patient</b></Link> */}
  {/* <Link to="/login"><b>login</b></Link> */}
  <h4 className="menu">&nbsp;&nbsp;<Link to="/registration"><b>Master Registration</b></Link>&nbsp;&nbsp;</h4>
  <Routes>
        {/* <Route exect path="/home" element={<Patient/>}/> */}
        {/* <Route exect path="/view" element={<ViewPatient/>}/> */}
        <Route exect path="/registration" element={<Registration/>}/>
        <Route exect path="/login" element={<Login/>}/>
  </Routes>
  </BrowserRouter>
  </div>
}
}