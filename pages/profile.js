import { getSession } from 'next-auth/react'
import Profile from '../Components/user/Profile'

export default function profile() {
  return (
    <div>
        <Profile />
    </div>
  )
}

export async function getServerSideProps(context){

 const session = await getSession({req:context.req})

 if(!session){
   return {
     redirect:{
       destination:'/',
       parmanent:false
     }
   }
 }

 return {
   props:{session}
 }

}


