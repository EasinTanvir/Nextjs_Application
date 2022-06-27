import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyPasswords } from '../../../Components/helper/auth';
import { helpers } from '../../../Components/helper/helper';
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers:[        
        CredentialsProvider({
            async authorize(credentials){
                const client = await helpers();
                const userinterface = client.db().collection('user')
                const user =await userinterface.findOne({email:credentials.email})
                if(!user){
                    client.close()
                   throw new Error('no user found')
                
                }
                const veifypass = await verifyPasswords(credentials.password,user.password)
                if(!veifypass){
                    client.close()
                    throw new Error('password incorrect')
                }
                client.close()              

                return {email:user.email}

            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })



       
    ],
    secret:'secret'
})