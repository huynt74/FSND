import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { NextResponse, NextRequest } from "next/server";

import { GET, test } from "./api/auth/route";
import { useRouter } from "next/navigation";
import {jwtDecode} from 'jwt-decode';


export default function Home() {
  const { user, error, isLoading } = useUser();
  const [token, setToken] = useState({token: false});
  const route = useRouter();

  useEffect(() => { 
    getTokens()
    // console.log(JSON.stringify(localStorage.getItem('token')))
    console.log(token)
  }, [user]);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token.token))
    // const tk = JSON.stringify(token.token)
    let role = 0
    if (token?.token){
      const decode = jwtDecode(token.token.toString())
      if (decode?.permissions.length == 6) {
        role = 6
      } else if (decode?.permissions.length == 8){
        role = 8
      } else {
        role = 2
      }
    }
    localStorage.setItem('role', role)
    
  }, [token])
  const getTokens = async() => {
    await fetch('/api/my-api').then(async res => {
      const token = await res.json()
      // console.log(typeof token)
      setToken(token)
      
    })
  }
  const handleLoginAuth = async () => {
    route.push("/api/auth/login");
    // const res = await fetch('http://localhost:3000/api/auth/login')
    // const {accessToken} = getAccessToken()
    // console.log('token',accessToken);
    // await getTokens()
    localStorage.setItem('isLogin', true)
  };
  const handleLogoutAuth = () => {
    route.push("/api/auth/logout");
    localStorage.setItem('isLogin', false)
    localStorage.removeItem('token')
    localStorage.removeItem('role')

  };
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.container}>
      {user ? (
        <>
          Welcome {user.name}!
          {/* <a href="/api/auth/logout" style={{'color': 'red'}} > Logout</a> */}
          <button onClick={handleLogoutAuth}>Logout</button>
        </>
      ) : (
        // <a href="/api/auth/login" style={{'color': 'blue'}} className='button__login'>Login</a>
        <button onClick={handleLoginAuth}>Login</button>
      )}
      <footer></footer>
      {/* <a href='https://dev-dy3gcdy8xgl2aq10.us.auth0.com/authorize?client_id=ISpGy0r51Bx6c77JV7kgOOE5wD54usGk&scope=openid profile email offline_access read:products&response_type=token&redirect_uri=http://localhost:3000/api/auth/callback/&audience=fsnd-api'>log</a> */}
    </div>
  );
}

// export async function getServerSideProps(ctx) {
// try {
//   const { accessToken } = await getAccessToken(ctx.req, ctx.res);
//   // console.log(accessToken)
//   // const token = accessToken
//   return {props: { token: accessToken }};
// } catch (error) {
//   console.log(error)
// }
// return {props: { token: false }};
// }

// export async function getTokens() {
//   try {
//     const { accessToken } = await getAccessToken();
//     console.log('kaka', accessToken)
//     const token = accessToken
//     return {props: { token: accessToken }};
//   } catch (error) {
//     console.log(error)
//   }
//   return {props: { token: false }};
//   }