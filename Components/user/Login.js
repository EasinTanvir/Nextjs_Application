import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';
import {useState} from 'react';
import axios from 'axios';
import classes from './login.module.css'
import { Router } from 'next/router';

export default function LogIn() {

  const router = useRouter()

  const [messages,setMessages] = useState()
  const [error,setError] = useState()

    const [user, setUser] = useState(true)
    const inputData = {email:'',password:''}
    const [input,setInput] = useState(inputData)

    function onChangeHandler(e){

      const {name,value} = e.target;

      setInput({...input,[name]:value})

    }

   async function onSubmitHandler(e){
      e.preventDefault()

      if(user){

      const result =  await signIn('credentials',{
        redirect:false,
        email : input.email,
        password:input.password
      })

      setError(result)

     if(!result.error){
       router.replace('/home')
     }
       

      }else{

      const recData = {
        email : input.email,
        password:input.password
      }

     const result = await axios.post('/api/auth/login',recData)
     setMessages(result.data)
     
    }

    }
 
  return (
    <div className={classes.main}>
   <form
   onSubmit={onSubmitHandler}
    className={classes.form}>
   <h1>{user?'LogIn':'SignUp'}</h1>
   <hr />
       <div>
       <label htmlFor='email'>Email : </label>
        <input onChange={onChangeHandler} name='email'  placeholder='type your email' required id='email' type='email'/>
       </div>
       <div>
       <label htmlFor='pass'>Password : </label>
        <input onChange={onChangeHandler} name='password' placeholder='type your password' required id='pass' type='password'/>
       </div>
       <div className={classes.btn1}> 
       <button>{user?'SignIn':'SignUp'}</button>
       <div className={classes.text}><button onClick={()=> signIn("google") }>SignIn with Google</button></div>
       </div>
      <div className={classes.btn2}>
      <button onClick={()=>setUser(!user)}>{user?'Create an account':'LogIn with existing account'}</button>
      </div>
     <div> {messages && <h2>{messages.message}</h2>}</div>
     <div> {error && <h2>{error.error}</h2>}</div>
   </form>
 
    </div>
  )
}
