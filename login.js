import React,{useState} from 'react';
import "./login.css";
import { useNavigate } from 'react-router';
import "./registration";


const Login =()=>{
  const history = useNavigate();
  const[user,setUser] = useState({
    email:'',
    password:'',
    message:''
  })
const handlechange=(event)=>{
const{name,value}=event.target
setUser({
  ...user,
  [name]:value
})
}

const userlogin= ()=>{
  const {email,password,message} = user
    fetch("http://localhost:8080/cliniclogin",
    {
      method : 'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body : JSON.stringify(user)
    }).then(response=>response.json()).then(data=>
      {
      console.log(data.message);
      // history("/registration")
    })
    // .    catch(err=>{
    //   console.log(err);
    //  alert('invalid user')
    // })
    }
return(
<form class="signup-form" onSubmit={userlogin}>
    <div class="form-header">
  <h1>Login User</h1></div>
    <div class="form-body">
         <div class="horizontal-group">
        <div class="form-group left">
            <label class="label-title">User name</label>
            <input type="text" name='email' value={user.email} onChange={handlechange} class="form-input" placeholder="enter your email"/>
        </div>
        <div class="form-group right">
            <label for="lastname" class="label-title">Password</label>
            <input type="password" name ='password' class="form-input" placeholder="enter your password" value={user.password} onChange={handlechange} />
        </div>
    </div>    
</div>
<div class="form-footer">
  <button type="submit" class="btn" >login</button>&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;<button  class="btn" onClick={()=>history('/registration')} >register</button>
</div>
</form>
)}
export default Login