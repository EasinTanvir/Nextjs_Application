import { hashedPasswords } from "../../../Components/helper/auth";
import { helpers } from "../../../Components/helper/helper";

export default async function handler(req,res){

    if(req.method==='POST'){

        const data = req.body;
        const {email,password} = data;

        const hashPass = await hashedPasswords(password)

        const recValues = {
            email,
            password:hashPass
        }

        if(!email || !email.includes('@') || !password || password.trim().length<8){
            res.status(200).json({message:'*password must be 8 character'})
            return
        }

const client = await helpers();
const db = client.db();
const existingUser = await db.collection('user').findOne({email:email})
if(existingUser){
    res.status(200).json({message:'*sorry email already taken'})
    client.close()
    return
}
const result = await db.collection('user').insertOne(recValues)
res.status(200).json({message:'login successfully'})
client.close();
    }

}