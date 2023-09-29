import type { ReactNode } from 'react';
import Link from 'next/link';
import './global.css';

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <head>
                <title>Game Reviews</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/reviews">Reviews</Link>
                            </li>
                            <li>
                                <Link href="/about" prefetch={false}>About</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    Game data and images courtesy of <a href="https://rawg.io" target='_blank'>RAWG</a>
                </footer>
            </body>
        </html>
    );
}