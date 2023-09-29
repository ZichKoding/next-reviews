import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body className="px-4 py-2">
                <header>
                    <nav>
                        <ul className="">
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
                <main className="">
                    {children}
                </main>
                <footer>
                    Game data and images courtesy of <a href="https://rawg.io" target='_blank'>RAWG</a>
                </footer>
            </body>
        </html>
    );
}