'use client';
import { getSession, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { DELETE_API, GET_API, POST_API, REQUEST_API } from './type';

export const GET: GET_API = async (url, option, headers) => {
  return await request(url, 'GET', null, option, headers);
};

export const POST: POST_API = async (url, body, option, headers) => {
  return await request(url, 'POST', body, option, headers);
};

export const DELETE: DELETE_API = async (url, body) => {
  return await request(url, 'DELETE', body);
};

const request: REQUEST_API = async (url, method, body, option) => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!session || !accessToken) {
    window.location.href = '/';
  }

  return new Promise(async function (resolve, reject) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          'Accept-Language': 'ko',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        ...option,
      });

      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else if (response.status === 401) {
        // Access token expired, try to refresh it

        const newAuthResponse = await fetch('/api/auth/session?update');
        const newAuth = await newAuthResponse.json();

        const retryResponse = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: {
            Authorization: `Bearer ${newAuth.accessToken}`,
            'Accept-Language': 'ko',
            'Content-Type': 'application/json',
          },
          ...option,
        });

        if (retryResponse.ok) {
          const data = await retryResponse.json();
          resolve(data);
        } else {
          console.log('토큰 갱신에 실패함.');
          //    signOut({ callbackUrl: "/" });
        }
      } else {
        toast('A network problem has occurred.(A102)');
        console.log(`API call failed with status code ${response.status}`);
      }
    } catch (error) {
      toast('A network problem has occurred.(A101)');
      console.log('error >', error);
    }
  });
};

export const fetcher = (url: string) => GET(url);