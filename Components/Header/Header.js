import { useSession,signOut } from 'next-auth/react';
import Link from 'next/link';
import classes from './header.module.css';

export default function Header() {

 const {data:session,status} = useSession()
 const loading = status ==='loading';

 function logoutHandler(){
  signOut()
 }

  return (
    <div className={classes.main}>
        <header className={classes.header}>
        <div className={classes.logo}><Link href='/home'>WinRRar</Link></div>       
           <nav>
           <ul className={classes.nav}>
               {session && ( <li><Link href='/profile'>Profile</Link></li>   )}           
                {session && (<li><button onClick={logoutHandler}>LogOut</button></li> )}            
                {!session && !loading && (<li><Link href='/'><button>SignIn</button></Link></li> )}            
            </ul>
           </nav>     
       
    </header>
    </div>
  )
}
