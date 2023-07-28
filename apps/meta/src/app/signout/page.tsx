'use client';
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const signOutPage = () => {
  useEffect(() => {
    console.log('로그아웃!!! ');
    signOut({ callbackUrl: '/' });

    return () => {};
  }, []);

  return <></>;
};

export default signOutPage;
