'use client';

import { useEffect } from "react";

export default function HomePage() {
    useEffect(() => {
        window.alert('Welcome to my site!!!');
    }
    , []);
    
    console.log('[HomePage] rendering');

    return (
        <>
            <h1>
                Indie Gamer
            </h1>
            <p>
                Only the best indie games, reviewed for you. 
            </p>
        </>
    )
}