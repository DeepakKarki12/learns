import mongoose  from "mongoose";

const RegisterSchema = new mongoose.Schema({

    id  : Number,
    email: String,
    name: String,
    phone: Number,
    password: String
})

const RegisterModel = mongoose.model("register", RegisterSchema);
export default RegisterModel;
    



// id    Int     @id @default(autoincrement())
//   email String  @unique
//   name  String
//   phone Int     @unique 
//   userId  String @unique
//   password String
//   Create_trip Create_trip[]