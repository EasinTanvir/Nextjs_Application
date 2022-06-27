import axios from 'axios';
import {useState} from 'react';
import classes from './profile.module.css'

export default function Profile() {

  const [success,setSuccess] = useState()

  const [showPass,setShowPass] = useState(false)

  const recData = {oldpass:'',newpass:''}
  const [input,setInput] = useState(recData)

  function onChangeHandler(e){

    const {name,value} = e.target;

    setInput({...input,[name]:value})

  }

  const onSubmitHandler= async(e)=>{
    e.preventDefault()

    const recValues = {
      oldPassword:input.oldpass,
      newPassword:input.newpass
    }

   const result = await axios.patch('/api/user/passchange',recValues)

 
setSuccess(result.data)


  }

  return (
    <div className={classes.main}> 
     <h2>Welcome to your profile</h2>  
    <div className={classes.passwords}>
    <button onClick={()=>setShowPass(!showPass)}>Change Your Password</button>
    </div>   
     {showPass? ( <form onSubmit={onSubmitHandler} className={classes.profile}>    
      <h3>Change your password</h3> 
        <div>
        <label htmlFor='old'>Old Password</label>
        <input onChange={onChangeHandler} name='oldpass' placeholder='old password' id='old' type='password'/>
        </div>
       <div>
       <label htmlFor='new'>New Password</label>
        <input onChange={onChangeHandler} name='newpass' placeholder='new password' id='new' type='password'/>
       </div>
       <button>Submit</button>
       {success && <h3>{success.message}</h3>}
      </form>):''}
    </div>
  )
}
