"use client";
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignOutPage = () => {

    console.log("http://localhost:3000/foo")

    useEffect(() => {
        signOut({ redirect: true, callbackUrl: '/foo' });

        return () => {};
    }, []);

    return <></>;
};

export default SignOutPage;