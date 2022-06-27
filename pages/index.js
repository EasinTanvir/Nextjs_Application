import { getSession } from 'next-auth/react';
import {Fragment} from 'react'
import LogIn from "../Components/user/Login";

export default function login() {
  return (
    <Fragment>
      <LogIn />
    </Fragment>
  )
}

export async function getServerSideProps(context){

  const session = await getSession({req:context.req})
 
  if(session){
    return {
      redirect:{
        destination:'/home',
        parmanent:false
      }
    }
  }
 
  return {
    props:{session}
  }
 
 }