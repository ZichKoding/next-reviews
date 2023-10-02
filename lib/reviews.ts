import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

interface Review {
    title: string;
    date: string;
    content: string;
    image: string;
    slug: string;
}

export async function getReview(slug: string): Promise<Review> {
    const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
    const { content, data: { title, date, image} } = matter(text);

    const curr_date = new Date(
        new Date(date).setDate(new Date(date).getDate() + 1)
    ).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    
    const body = marked(content);
    
    return {title: title, date: curr_date, content: body, image: image, slug: slug};
}

export async function getReviews(): Promise<Review[]> {
    const files = await readdir("./content/reviews");

    const slugs = files.filter((file) => file.endsWith(".md"))
        .map((file) => file.slice(0, -'.md'.length));

    const reviews = [];

    for (const slug of slugs) {
        const review = await getReview(slug);
        reviews.push(review);
    }
    return reviews;
}