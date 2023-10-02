import { readFile } from "node:fs/promises";
import { marked } from "marked";
import Heading from "@/components/Heading";

export default async function StardewValleyPage() {
    const text = await readFile("./content/reviews/stardew-valley.md", "utf-8");
    const html = marked(text);
    return (
        <>
            <Heading>
                Stardew Valley
            </Heading>
            <img src="/images/stardew-valley.jpg" alt="Stardew Valley" 
                width="640" height="360" className="mb-2 rounded"/>
            <article dangerouslySetInnerHTML={{ __html: html }}
                className="max-w-screen-sm prose prose-slate " />
        </>
    );
}