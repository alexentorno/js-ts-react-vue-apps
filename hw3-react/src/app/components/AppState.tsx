"use client"

import { AppContext, IUserInfo } from "@/state/AppContext";
import { useEffect, useState } from "react";

export default function AppState({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const storageUser = JSON.parse(localStorage.getItem("userInfo") || '[]');
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(storageUser);

    //const [userInfo, setUserInfo] = useState<IUserInfo | null>(localStorage.getItem('token'));

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }, [userInfo])

    return (
        <AppContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </AppContext.Provider>
    );
}
