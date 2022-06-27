import { getSession } from "next-auth/react";
import Home from "../Components/user/Home";

export default function home() {
  return (
    <div>
        <Home />
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
