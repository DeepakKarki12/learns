import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type:String,unique:true},
    name: String,
    phone: Number,
    password: String

})
const tripSchema = new mongoose.Schema({
    from:String,
    to:String,
    userdata:{type:Object,ref:'User'}

})

const RegisterModel = mongoose.model("User", userSchema);
const tripModel = mongoose.model("trip", userSchema);
export  {RegisterModel,tripModel};
    



// id    Int     @id @default(autoincrement())
//   email String  @unique
//   name  String
//   phone Int     @unique 
//   userId  String @unique
//   password String
//   Create_trip Create_trip[]