// import { NextResponse } from 'next/server';
// import { getAccessToken } from '@auth0/nextjs-auth0';

// export async function GET() {
//   const { accessToken } = await getAccessToken();
//   console.log(accessToken)
//   return NextResponse.json({ foo: 'bar' });
// }

// Or, it's slightly more efficient to use the `req`, `res` args if you're
// using another part of the SDK like `withApiAuthRequired` or `getSession`.
import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const GET = withApiAuthRequired(async function GET(req) {
  console.log('token')
  const res = new NextResponse();
  // const req = new NextRequest()
  const { accessToken } = await getAccessToken(req, res);
  console.log(accessToken)
  return NextResponse.json({ foo: 'bar' }, res);
});

export { GET, test };

const test = withApiAuthRequired(async function products(req, res) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  console.log(accessToken)
  return accessToken
});