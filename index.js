import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use('/',(req,res)=>{
    console.log("hello world")

    const pathOffile = path.join(__dirname,'frontend/')
    console.log(pathOffile)
    return res.sendFile("signup.html",{root : pathOffile})
})

app.listen(9000,() => {
  console.log("running on port 9000")
})