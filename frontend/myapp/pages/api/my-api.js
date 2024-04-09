import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function MyApi(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res);

        res.status(200).json({ token: accessToken });
    } catch (error) {
        console.log(error)
    }
  
//   localStorage.setItem('token', accessToken)
  res.status(200).json({ token: false });
}