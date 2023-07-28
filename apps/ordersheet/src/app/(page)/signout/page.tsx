"use client";
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignOutPage = () => {

    console.log("12312312312321")
    useEffect(() => {
        signOut({ callbackUrl: '/' });

        return () => {};
    }, []);

    return <></>;
};

export default SignOutPage;