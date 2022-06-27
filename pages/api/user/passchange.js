import { getSession } from "next-auth/react"
import { hashedPasswords, verifyPasswords } from "../../../Components/helper/auth"
import { helpers } from "../../../Components/helper/helper"

export default async function handler(req,res){

    if(req.method!=='PATCH'){
        return
    }

    const session = await getSession({req:req})
    if(!session){
        res.status(200).json({message:'not authonicated'})
        return
    }

    const userEmail = session.user.email;
    const oldpass = req.body.oldPassword;
    const newpass = req.body.newPassword;

    const client = await helpers();
    const existinguser = client.db().collection('user');
    const user = await existinguser.findOne({email:userEmail})

    if(!user){
        res.status(230).json({message:'no user found'})
        client.close()
        return
    }

    const currentpass = user.password;
    const passwords =await verifyPasswords(oldpass,currentpass)

    if(!passwords){
        res.status(220).json({message:'invalid password'})
        client.close()
        return
    }

    const hasedpass = await hashedPasswords(newpass)

  const result = await existinguser.updateOne({email:userEmail},{ $set:{password:hasedpass}})
  res.status(200).json({message:'password update succesfully'})

  client.close()




}