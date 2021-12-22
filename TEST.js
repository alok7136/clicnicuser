const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors())

const clinicuser = new mongoose.Schema({
    
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:Number,
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
const user = new mongoose.model("user",clinicuser);

app.get("/clinicuser",async(req,res)=>
{
// console.log("hello 2")
res.send(await Detail.find())
res.status(200)
})

app.post("/clinicreg",async(req,res)=>{
try {
    console.log(req.body);
    const data = new user({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
         email:req.body.email,
        password:req.body.password,
       confirmpassword:req.body.confirmpassword,
       gender:req.body.gender
});
    const result = await user.save()
    res.send(result);    
}
catch (error) {
    console.log("error in data saving")
}
})

// app.put("/edit/:_id",(req,res)=>
// { Detail.updateOne({_id:req.params._id},
//     {$set:{name:req.body.name,contact_number:req.body.contact_number,age:req.body.age,gender:req.body.gender,visit_date:req.body.visit_date,symtoms:req.body.symptoms,fee_collected:req.body.fee_collected}}
//     ).then((result)=>{
//         res.status(200).json(result)})
//     })

app.listen(8080,()=>console.log("server is running on 8080"));