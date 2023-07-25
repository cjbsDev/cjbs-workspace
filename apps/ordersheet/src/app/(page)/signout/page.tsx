"use client";
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignOutPage = () => {
    useEffect(() => {
        signOut({ callbackUrl: '/' });
        return () => {};
    }, []);

    return <></>;
};

export default SignOutPage;