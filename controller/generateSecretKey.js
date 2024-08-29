import crypto from "crypto"

const generateKey = ()=>{

    const secretKey = crypto.randomBytes(32).toString('hex');
    console.log("token generated and stored",secretKey);
    return secretKey
}


export default generateKey;

