import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
// import prismaClient from "@prisma/client"
import mongoose from "mongoose";
import {RegisterModel,tripModel} from "./Models/Register.js"
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import authenticateToken from "./controller/tokenauth.js";
import generateKey from "./controller/generateSecretKey.js";
// import https from 'https'

dotenv.config();

const ATLAS_URL = process.env.ATLAS_URL
mongoose.connect(ATLAS_URL)

// // Convert import.meta.url to a file path    
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// const app = express()
// const jsonParser = bodyParser.json()

// app.get('/',(req,res)=>{
//     console.log("hello world")

//     const pathOffile = path.join(__dirname,'frontend/')
//     console.log(pathOffile)
//     return res.sendFile("signup.html",{root : pathOffile})
// });

// app.get("/backend/home/login", async (req,res)=>{
//     console.log("login...")
//     // console.log("request",req.body)
//     const pathOffile = path.join(__dirname,'frontend/')
//     console.log("--------",pathOffile)
//     return res.sendFile("loginpagefromsonet.html",{root : pathOffile})

// })

// app.listen(9000,() => {
//   console.log("running on port 9000")
// })


// const prismaClient = require("@prisma/client")
// const express = require("express")
// const bodyParser = require("body-parser")
// const prisma = new prismaClient.PrismaClient()
// const path = require("path")

const app = express()
app.use(cors(
    {
        origin: ["https://qaenvironment.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())




const jsonParser = bodyParser.json()


// data:{
//     "email":"nitin@gmail.com",
//     "name": "Nitn",
//     "phone":1234,
//     "userId": "nitin",
//     "password": "nitinpass"
//     }


app.get("/home",jsonParser, async (req,res)=>{
        
    return res.json(newUser)
});

app.post("/create",jsonParser, async (req,res)=>{
    const data = req.body
    console.log("request---------------->",data)
    const check = await RegisterModel.findOne({email:data.email})
    console.log("check----------->",check)
    if(check){
        return res.status(400).json({
            message:"user already exits"
        })
    }else{
        const newUser = await RegisterModel.create(data)
        console.log("newuser",newUser)
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        console.log("token generated",token)
        return res.status(200).json({ 
        success: true, 
        message: ` ${token}successfully logged in`
        });
    }
})

// referer:https://vercel.com/deepakkarki12s-projects/qaenvironment

// app.get("/getall",jsonParser, async (req,res)=>{    
//     const allUser = await prisma.User.findMany()
//     console.log("allUser",allUser)
    
    
//     return res.json(allUser)
// })

// app.get("/gettrip",jsonParser, async (req,res)=>{    
//     const alltrip = await prisma.Create_trip.findMany()
//     console.log("allUser",alltrip)
    
    
//     return res.json(alltrip)
// })

// app.post("/loginofoneusercheck",jsonParser, async (req,res)=>{ 
//     const oneUser = await prisma.User.findUnique({
//         where :{
//             userId: req.body.userId,
//             password: req.body.password
//         }
//     })
//     if (!oneUser){
//         console.log("oneUser",oneUser)
//         // let data = {
//         //     data:"user does not exits"
//         // }

//         return res.send("user does not exits")

//     }
//     console.log("oneUser",oneUser)
//     // const oneUser = {
//     //     "helo":"hii"
//     // }
    
    
//     return res.send(`${oneUser.name} successfully logged in . . .`)
// })
app.post("/login", jsonParser, async (req, res) => {
    console.log("loging")
    const key = generateKey();
    console.log("key",key)
    try {
        const { userId, password } = req.body;
        console.log("res body",req.body)
        console.log("name pass",userId,password)
        if (!userId || !password) {
            return res.status(400).json({ success: false, message: "User ID and password are required" });
        }
        // const oneUser = {name:"Deepak karki"}
        console.log("send",userId,password)
        await RegisterModel.findOne({name:userId,password:password})
        .then (user =>{
            console.log("user",user)
            if(user){
            console.log("successfully find")
            const token = jwt.sign({ userId: user.email },key, { expiresIn: '1h' });
            return res.status(200).json({ 
                success: true, 
                message: `${key} successfully logged in`,
                token:token,
                key:key,
                user:user
                 })
            }

        
        return res.status(401).json({ success: false, message: "Invalid credentials" });
        

        // // You might want to implement proper session management or JWT here
        // return res.status(200).json({ 
        //     success: true, 
        //     message: `${oneUser.name} successfully logged in`
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "An error occurred during login" });
    }
});

// // ##################################################
// // trip table


// app.post("/login/:ids/createtrip",jsonParser, async (req,res)=>{
//     console.log("request",req.body)
//     console.log("id", +req.params.ids)
//     const newTrip = await prisma.Create_trip.create({
//     data : {
//         ...req.body,
//         userId:+req.params.ids
//     }
        
//     })
//     console.log("newTrip",newTrip)
    
    
//     return res.send(`Trip has been successfully created from ${req.body.From} to ${req.body.To}`)
//     // return res.send("trip table testing")
// })



app.get("/backend/home/login",jsonParser, async (req,res)=>{
    console.log("login...")
    console.log("request",req.body)
    // return res.redirect('/login_screen');
    const pathOffile = path.join(__dirname,"frontend/")
    return res.sendFile("loginpagefromsonet.html",{root : pathOffile})
    // return res.send("trip table testing")
})
app.get("/login_screen",jsonParser, async (req,res)=>{
    const pathOffile = path.join(__dirname,"frontend/")
    return res.sendFile("loginpagefromsonet.html",{root : pathOffile})
})

app.get("/",jsonParser, async (req,res)=>{
    // console.log("request",req.body)
    const pathOffile = path.join(__dirname,"frontend/")
    return res.sendFile("signup.html",{root : pathOffile})
    // return res.send("trip table testing")
})


// app.post("/backend",jsonParser, async (req,res)=>{
//     console.log("request...", req.body)

//     const verify = await prisma.User.findUnique({
//         where :{
//             userId : "karki",
//             password: "karkipass"
//         }
//     })
//     console.log("verify.....",verify)
//     if (verify){
//         console.log(">>>>>>>>>>>>>>>>>>..")
//         const pathOfFile = path.join(__dirname, "frontend_screens", "trip_data.html");
//         return res.redirect('/trip_data.html');
//     }else{
//         console.log("not valid credential")
//         return res.send("plese enter valid credentials")
//     }
     
    
//     // return res.send("trip table testing")
// })
app.get('/loginpage', (req, res) => {
    console.log("login page")
    const pathOfFile = path.join(__dirname, "frontend", "loginpagefromsonet.html");
    return res.sendFile(pathOfFile);
});
app.post('/trip_data_auth',authenticateToken, (req, res) => {
    console.log("tripdata")
    console.log("payload auth---->",req.body)
   
    return res.status(200).json({success:true,message:"success auth heading towards trip data",user:req.body.payload.user})

});

app.get('/trip_data', async (req, res) => {
    console.log("tripdata",req.query.id)
    try{
    await RegisterModel.findOne({email:req.query.id})
    .then (userData =>{
        if (userData){
        console.log("payload trip---->",userData)
        const pathOfFile = path.join(__dirname, "frontend", "trip_data.html");
        return res.sendFile(pathOfFile);

        }else{
        const pathOfFile = path.join(__dirname, "frontend", "loginpagefromsonet.html");
        return res.sendFile(pathOfFile);
        }
        })

    }catch (error) {
        console.log("error")
        res.status(500).send("trip_data route")
    }
    
});




// const httpserver = https.createServer(app)

// httpserver.listen(5000,"0.0.0.0",()=>{
//     console.log("working on port 5500")
// })
app.listen(5500,()=>{console.log("working on port 5500")})
