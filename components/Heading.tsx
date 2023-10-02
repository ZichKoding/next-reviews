import { ReactNode } from "react";
import { roboto_flex } from "@/app/fonts";


interface HeadingProps {
    children: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
    return (
        <h1 className={`font-bold pb-3 text-2xl ${roboto_flex.className}`}>
            {children}
        </h1>
    );
}