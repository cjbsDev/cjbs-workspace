import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth/core/types';
import { RetrunRefreshAccessToken } from '../../../../next-auth';

export const useGET = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if(status === "authenticated"){
        console.log("API CALL");
        
        fetchData(url, session);
    }
  }, [url, session]);

  const fetchData = useCallback(async (url:string, session: Session|null) => {
    setIsLoading(true);
    console.log("status > " , status, session);
    
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
        setData(data);
      } else if (response.status === 401) {
        // Access token expired, try to refresh it
        const refreshToken = session?.refreshToken;
        const email = session?.email;
        const uid = session?.uid;
        const authorities = session?.authorities;

        if (!refreshToken) { //로그인 페이지로
          console.log('token not found in session');
        }
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/accessToken`, {
          method: 'GET',
          headers: {
            'Accept-Language' : 'ko',
             emSW: refreshToken!,
          },
        });

        if (refreshResponse.ok) {

          const refreshedData = await refreshResponse.json();

          const data = refreshedData.data
      
          const newToken: RetrunRefreshAccessToken = {
            email,
            uid,
            authorities,
            ...data
          }

          await update(newToken)
          console.log("${newToken.accessToken} > " , newToken.accessToken);
          

          // Update access token and retry failed API call
          const retryResponse = await fetch(url, {
          mode:'no-cors',  //TODO 도메인 확정시 개발 및 운영은 같은도메인으로 맞추고 해당옵션은 cors로 변경 로컬일 때만 no-cors
            headers: {
              Authorization: `Bearer ${newToken.accessToken}`,
            },
          });

          if (retryResponse.ok) {
            const data = await retryResponse.json();
            setData(data);
          } else {
            setError('Failed to refresh access token and retry API call');
          }
        } else {
          setError('Failed to refresh access token');
        }
      } else {
        setError(`API call failed with status code ${response.status}`);
      }
    } catch (error) {
      setError('API call failed');
    }

    setIsLoading(false);
  }, [])

  return { data, error, isLoading };
};

export default useGET;
