"use client";
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignOutPage = () => {

    useEffect(() => {
        signOut({ redirect: true, callbackUrl: '/' });

        return () => {};
    }, []);

    return <></>;
};

export default SignOutPage;