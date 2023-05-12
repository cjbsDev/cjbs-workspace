'use client'
import { useState, useEffect, useCallback } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { RetrunRefreshAccessToken } from '../../../next-auth';

export const GET = async (url:string) => {

    const session = await getSession()
    
    if(!session || !session.accessToken){
        window.location.href = "/"
    }

    return new Promise(async function (resolve, reject) {
        try {
            const accessToken = session?.accessToken;
            
            if (!accessToken || accessToken === undefined) { //로그인 페이지로
                console.log('token not found in session');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                //mode:'no-cors',  //TODO 도메인 확정시 개발 및 운영은 같은도메인으로 맞추고 해당옵션은 cors로 변경 로컬일 때만 no-cors
                credentials: "include",
                headers: {
                'Accept-Language' : 'ko',
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                resolve(data)
            //    setData(data);
            } else if (response.status === 401) {
                // Access token expired, try to refresh it
                
                const newAuthResponse = await fetch('/api/auth/session?update')
                const newAuth = await newAuthResponse.json()

                const retryResponse = await fetch(url, {
                    headers: {
                    Authorization: `Bearer ${newAuth.accessToken}`,
                    },
                });

                if (retryResponse.ok) {
                    const data = await retryResponse.json();
                //  setData(data);
                } else {
                //   setError('Failed to refresh access token and retry API call');
                }
                
            } else {
            // setError(`API call failed with status code ${response.status}`);
            }
        } catch (error) {
        // setError('API call failed');
        }
    })
}
