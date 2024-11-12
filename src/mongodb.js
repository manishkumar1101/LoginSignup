const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/loginsignup")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect")
})

const loginschema=new mongoose.Schema({
    username:{
        type:String,
         require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
})

const collection=new mongoose.model("collection",loginschema)

module.exports=collection