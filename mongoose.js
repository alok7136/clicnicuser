const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors())
mongoose.connect("mongodb://localhost:27017/PatientDB",{useNewUrlParser:true})
.then(()=>console.log("server Sucessfully Connected")).catch((err)=>console.log("err"));

const PatientSchema = new mongoose.Schema(
    {
    clinicuserid:{type:mongoose.Schema.Types.ObjectId,
        ref:'clinicuser'
    },
    name:{
        type:String,
        require:true
    },
    contact_number:{
        type:Number,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    visit_date:{
        type:String,
        require:true
    },
    symptoms:{
        type:String,
        require:true
    },
    fee_collected:{
        type:Number,
        require:true
    }
    });
const Detail = new mongoose.model("Patient",PatientSchema);

app.get("/patientDetail",async(req,res)=>
{
// console.log("hello 2")
res.send(await Detail.find())
res.status(200)
})

app.post("/savepatientDetail",async(req,res)=>{
try {
    console.log(req.body);
    const data = new Detail({
        name:req.body.name,
        contact_number :req.body.contact_number,
        age:req.body.age,
        gender:req.body.gender,
        visit_date :req.body.visit_date,
        symptoms : req.body.symptoms,
        fee_collected :req.body.fee_collected
    });
    const result = await data.save()
    res.send(result);    
}
catch (error) {
    console.log("error in data saving")
}
})

app.delete("/delete/:_id",(req,res)=>{
    Detail.deleteOne({_id:req.params._id}).then((result)=>{
        res.status(200).json(result)}).catch((error)=>{
            console.log(error);
})
})

app.put("/edit/:_id",(req,res)=>
{ Detail.updateOne({_id:req.params._id},
    {$set:{name:req.body.name,contact_number:req.body.contact_number,age:req.body.age,gender:req.body.gender,visit_date:req.body.visit_date,symtoms:req.body.symptoms,fee_collected:req.body.fee_collected}}
    ).then((result)=>{
        res.status(200).json(result)})
    })

const clinicuser = new mongoose.Schema({
           firstname:{
           type:String,
           require:true
          },
           lastname:{
           type:String,
           require:true
          },
           email:{
           type:String,
           require:true
          },
           password:{
           type:String,
           require:true
          },
           confirmpassword:{
           type:String,
           require:true
          },
          gender:{
           type:String,
           require:true
          }
        });

    const user = new mongoose.model("user",clinicuser)
    app.post("/clinicreg",(req,res)=>{
    const {firstname,lastname,email,gender,password}=req.body
    // console.log(req.body);    
    console.log(user)
        user.findOne({email:req.body.email},(err,data)=>{
            if(data){
                console.log(data);
                res.send({message:'user already registered!!'})
            }
            else{
                const User = new user({
                    firstname,lastname,email,gender,password 
                })
                User.save(err=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send({message:"successfully"})
                    }
                })
            }
        })
    })

    app.post("/cliniclogin",(req,res)=>{
    console.log('hello')
    let {email,password} = req.body
    console.log(req.body)
        user.findOne({email:req.body.email},(err,data)=>{
            if(data){
                console.log(data.password+"  "+password );
                if(password===data.password)
                {
                    console.log("sucessfull")
                    res.send({message:"login sucessfully"})
                    
                }
                else{
                    res.send({message:"invalid login"})
                }
            }
            else{
                res.send({message:"this email is not registered with us....sorry!!!"})
            }
        })
    })
    app.listen(8080,()=>console.log("server is running on 8080"))