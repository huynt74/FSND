import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import useLocalStorage from '../../../hooks/useLocalStorage';
import { redirect, useRouter } from 'next/navigation';

// export default handleAuth();
export const afterCallback = async(req, res, session, state) => {
    // session.user.customProperty = 'foo';
    // delete session.refreshToken;
    // console.log(session.accessToken,'hllllllkkkks',state)
    // const {accessToken} =  getAccessToken(req,res)
    // console.log('tokens', accessToken)
    // const [token, setToken] = useLocalStorage('token', session.accessToken)
    // if (typeof window !== "undefined")
    // window?.localStorage.setItem('token', session.accessToken)
    // sessionStorage.setItem('token', session.accessToken)
    // useRouter().push(`/actors?token=${session.accessToken}`)
    
    return session
  };
  
export default handleAuth({
    login: await handleLogin({
        authorizationParams: {
            client_id: process.env.AUTH0_CLIENT_ID,
            scope: process.env.AUTH0_SCOPE,
            response_type: process.env.AUTH0_RESPONSE_TYPE,
            redirect_uri: process.env.AUTH0_REDIRECT_URI,
            audience: process.env.AUTH0_AUDIENCE,  
            secret: process.env.AUTH0_SECRET,
            base_url: process.env.AUTH0_BASE_URL,
            issuer_base_url: process.env.AUTH0_ISSUER_BASE_URL

        }
    }),
    logout:  handleLogout({returnTo: process.env.AUTH0_BASE_URL}),
    callback:  handleCallback({redirectUri: process.env.AUTH0_REDIRECT_URI, afterCallback: afterCallback}),
    // profile: handleProfile({refetch: true, afterRefetch})
});

export  function logo(){
    console.log('logout')
}

export  function logi(){
    console.log('login')
}
