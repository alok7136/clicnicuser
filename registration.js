import React,{useState} from 'react';
import "./registration.css";
import {useNavigate} from 'react-router-dom';

const Register =()=>{
const navigate = useNavigate()

const [user,setUser] = useState({
      firstname:'',
      lastname:'',
      email:'',
      gender:'',
      password:'',
      confirmpassword:''
  })
const handlechange =(event)=>{
const {name,value} = event.target;
setUser ({
  ...user,
  [name]:value
})
}
const register=()=>{
const {firstname,lastname,email,gender,password,confirmpassword} = user
if(firstname && lastname && email && gender && password && (password===confirmpassword))
  {
     fetch("http://localhost:8080/clinicreg",
    {
      method : 'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(user)
    }).then(response=>response.json()).then(data=>
      {
      alert("user sucessfully Created!! ")
    }).catch(err=>{
      alert('Clinic User not Created')});
    }
    else{
      alert('invalid input');
    }
  }
 return( 
 <div>
     <form class="signup-form" onSubmit={Register}>
    <div class="form-header">
  <h1>Create Clinic User Account</h1></div>
    <div class="form-body">
         <div class="horizontal-group">
        <div class="form-group left">
            <label for="firstname" class="label-title">First name *</label>
            <input type="text" name='firstname' value={user.firstname} onChange={handlechange} class="form-input" placeholder="enter your first name"/>
        </div>
        <div class="form-group right">
            <label for="lastname" class="label-title">Last name</label>
            <input type="text" name ='lastname' class="form-input" placeholder="enter your last name" value={user.lastname} onChange={handlechange} />
        </div>
        <div class="form-group">
  <label for="email" class="label-title">Email*</label>
  <input type="email" name='email' id="email" value={user.email} class="form-input" placeholder="enter your email"  onChange={handlechange}/>
</div>
<div class="horizontal-group">
  <div class="form-group left">
    <label for="password" class="label-title" >Password *</label>
    <input type="password" name="password" value={user.password} class="form-input" placeholder="enter your password" required="required" onChange={handlechange}/>
  </div>
  <div class="form-group right">
    <label for="confirm-password" class="label-title">Confirm Password *</label>
    <input type="password" name="confirmpassword" value={user.confirmpassword} class="form-input" placeholder="enter your password again" required="required" onChange={handlechange}/>
  </div>
  <div class="horizontal-group">
    <div class="form-group left">
        <label class="label-title">Gender:</label>
        <div class="input-group">
        <input type="text" name="gender" value={user.gender} onChange={handlechange}/>
        </div>
    </div>    
</div>
</div>
    </div>
    </div>
<div class="form-footer">
  <button type="button" class="btn" onClick={()=>navigate('/login')}>login</button>&nbsp;&nbsp;
  <button type="submit" class="btn" onClick={register}>Create</button>
</div>
</form>
</div>)
}

export default Register