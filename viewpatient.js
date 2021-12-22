import React from 'react'
// import axios from 'axios'
import "./viewpatient.css"
export default class ViewPatient extends React.Component {
    constructor() 
    {
    super()
    this.state= {
        patient:[],
        update:false,
        table:true,
        index:0,
        msg:''
    }
    }
    componentDidMount(){
        this.loadData()
      }

    loadData =() => 
    {
    fetch("http://localhost:8080/patientDetail").then(response => response.json()).then(data =>{
    this.setState({patient:data})
    console.log(data);
    }).catch(err=>{
    console.log(err)
    });
}
   
deletePatient =(event)=>
{
  event.preventDefault();
var patientId = event.target.getAttribute("data-pid");
// alert(patientId);
fetch("http://localhost:8080/delete/"+patientId,{method :'delete'}).then(response=>{
    alert(` this record has been deleted`)
    // this.loadData();
}).catch(error=>{
    alert('this record not deleted');
})
this.loadData();
}

editPatient=(event)=>{
event.preventDefault();
var obj = {
              name:this.namebox.value,
              contact_number :this.contactbox.value,
              age:this.agebox.value*1,
              gender: this.genderbox.value,
              visit_date : this.datebox.value,
              symptoms : this.symtombox.value,
              fee_collected : this.feebox.value
            }
            console.log(obj);
            fetch("http://localhost:8080/edit/"+this.state.index,
    {  method : 'PUT', headers : {'Content-Type':'application/json' },
     body : JSON.stringify(obj)
  }).then(response=>response.json()).then(data=>
    {  
    console.log(data);
  }).catch(err=>{
    console.log(err);
  });

  this.loadData();
  this.setState({table:true ,update:false  })
}

changePatient=(event)=>{
this.setState({update:true})
var patientId = event.target.getAttribute("data-pid");
// var indexid = event.target.getAttribute("data-index");
this.setState({index:patientId})
this.setState({table:false})
}


render()
{
 return <div className="bg">
   <h3 align="center" color="blue">Visited Patient List</h3>
   <hr/>
     {this.state.update?<div align="center"><form onSubmit={this.editPatient} className="p1">
              &nbsp;
              <div><input type='text' ref={c=>this.namebox=c} placeholder='Name' required /></div>
              &nbsp;&nbsp;
              <div><input type='number' ref={c=>this.contactbox=c} placeholder='Contact No'required/></div>
              &nbsp;&nbsp;
              <div><input type='age' ref={c=>this.agebox=c} placeholder='age' required /></div>
              &nbsp;&nbsp;
              <div><select ref={c=>this.genderbox=c} required>
                <option value=''>Choose Gender </option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select></div>
              &nbsp;&nbsp;&nbsp;
              <div><input type='date' ref={c=>this.datebox=c} placeholder='visitDate' required/></div>
              &nbsp;&nbsp;
              <div><input type='text' ref={c=>this.symtombox=c} placeholder='Symtom'  required/></div>
              &nbsp;&nbsp;
              <div><input type='number' ref={c=>this.feebox=c} placeholder='SubmitFee'  required/></div>
              &nbsp;&nbsp;
              <div><button type='submit'>update</button></div>
            </form></div>:''}
            {this.state.table ? <table border="1" align="center"  bgcolor="white" cellSpacing="0" cellPadding="2">
            <tr bgcolor="whitesmoke" color="white">
                <th>Index</th>
                <th>Id</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Date</th>
                <th>Symtom</th>
                <th>Fee</th>
                <th>Action</th>
            </tr>
            {this.state.patient.flatMap((rec,index) => 
            {
            return <tr> 
                    <td>{index+1}</td>
                    <td>{rec._id}</td>
                    <td>{rec.name}</td>
                    <td>{rec.contact_number}</td>
                    <td>{rec.age}</td>
                    <td>{rec.gender}</td>
                    <td>{rec.visit_date}</td>
                    <td>{rec.symptoms}</td>
                    <td>{rec.fee_collected}</td>
                    <th><spain data-pid={rec._id} data-index={index} onClick={this.changePatient}style={{cursor:"pointer", color:"red" }}>Edit</spain>&nbsp;&nbsp;&nbsp;<spain onClick={this.deletePatient} style={{cursor:"pointer" , color:"red"}}
                    data-pid={rec._id}>Delete</spain></th>
                </tr>
            })}
        </table>:''}
        </div>
           }
        }