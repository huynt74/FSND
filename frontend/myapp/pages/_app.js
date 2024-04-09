import '../styles/globals.css'
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return(  
  <UserProvider>
    <Link href={'/'} style={{'margin': 3}}>Home</Link>
    <Link href={'/actors'} style={{'margin': 3}}>Actor</Link>
    <Link href={'/movies'} style={{'margin': 3}}>Movie</Link>
    <Component {...pageProps} />
    
  </UserProvider>)
}

export default MyApp
