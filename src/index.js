// const express=require("express")
// const app=express()
// const path=require("path")
// const hbs=require("hbs")
// const collection=require("./mongodb")

// const templatepath=path.join(__dirname,'../templates') 
// const publicpath=path.join(__dirname,'../public') 


// app.use(express.json())
// app.set("view engine","hbs")
// app.set("views",templatepath)
// app.use(express.static(publicpath))
// app.use(express.urlencoded({extended:false}))

// app.get("/signup",(req,res)=>{
//     res.render("signup")
// })
// app.get("/login",(req,res)=>{
//     res.render("login")
// })
// app.get("/home", (req, res) => {
//     const username = req.query.username; // Retrieve username passed in the query
//     res.render('welcome', { username }); // Render welcome page with username
// });

// app.post("/signup",async(req,res)=>{
//     const data={
//         username:req.body.username,
//         email:req.body.email,
//         password:req.body.password
//     }
    
//     await collection.insertMany([data])
    
//     res.render("home")
// })

// app.post("/login",async(req,res)=>{
//     try{
//         const check=await collection.findOne({email:req.body.email})
//         if(check.password==req.body.password){
//             res.render("home")
//         }
//         else{
//             res.send("wrong password")
//         }
//     }
//     catch{
//         res.send("wrong details")
//     }
// })
// const Port=3000
// app.listen(Port,()=>{
//     console.log(`Server is connected in port ${Port}`);
// })


const express = require("express");
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb"); // Assuming MongoDB setup is correct

const app = express();
const Port = 3000;

// Paths for templates and public files
const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", templatePath);

// Routes
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/home", (req, res) => {
    const username = req.query.username; // Retrieve username passed in the query
    res.render('home', { username }); // Render home.hbs with username
});

// POST route for signup
app.post("/signup", async (req, res) => {
    try {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        
        await collection.insertMany([data]);
        
        res.redirect(`/home?username=${encodeURIComponent(data.username)}`);
    } catch (error) {
        res.send("Error during signup, please try again.");
    }
});

// POST route for login
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        
        if (check && check.password === req.body.password) {
            res.redirect(`/home?username=${encodeURIComponent(check.username)}`);
        } else {
            res.send("Incorrect password");
        }
    } catch (error) {
        res.send("Incorrect login details");
    }
});

// Start the server
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
