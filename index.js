import express from "express";

const app = express()

app.use('/',(req,res)=>{
    console.log("hello world")
    res.json({"message":"Hello world"})
})

app.listen(9000,() => {
  console.log("running on port 9000")
})