// app/my-page/page.js
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react';
import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

let token = '0'
let us = '0'
export default  function Test() {
  // const { accessToken } = await getAccessToken();
//   console.log(accessToken)
// const {user} = await getSession()
// console.log(user)
const {user} = useUser()
// const ck = cookies()
const get = async() => {
  const { accessToken } = await getAccessToken();
  console.log(accessToken)
}
useEffect(() => {
  console.log('tes us', user)
  us = user
  localStorage.setItem('test', user)
  // if (user)
  // get()
}, [user])
return <>my {token}</>
}
if (typeof window !== "undefined")
console.log(window.location)
export async function getServerSideProps(ctx) {
  let local = '1'
  
  // local = JSON.parse(localStorage?.getItem('test') || "{}") || null
 console.log('tes ', us)
  if (typeof window !== "undefined") {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);
  console.log(accessToken)
  token = accessToken
  }
  
  return { props: { foo: 'bar' } };
}