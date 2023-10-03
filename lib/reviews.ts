import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from "qs";

interface Review {
    title: string;
    date: string;
    content: string;
    image: string;
    slug: string;
};

export async function getFeaturedReview(): Promise<Review> {
    `
    Get the most recent review from the reviews directory
    and return it as a Review object.
    `
    const reviews = await getReviews();

    return await reviews[0];
};

export async function getReview(slug: string): Promise<Review> {
    const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
    const { content, data: { title, date, image} } = matter(text);

    const curr_date = new Date(
        new Date(date).setDate(new Date(date).getDate() + 1)
    ).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    
    const body = marked(content);
    
    return {title: title, date: curr_date, content: body, image: image, slug: slug};
};

/* 
    slug
    title
    date
    image
*/

export async function getReviews(): Promise<Review[]> {
    const url = 'http://localhost:1337/api/reviews?'
        + qs.stringify({
            fields: ['slug', 'title', 'subtitle', 'publishedAt'],
            populate: { image: { fields: ['url'] } },
            sort: ['publishedAt:desc'],
            pagination: { pageSize: 6 },
        }, { encodeValuesOnly: true });

    console.log(url);

    const response = await fetch(url);
    const { data } = await response.json();
    

    return data.map(({ attributes }: any) => ({
        slug: attributes.slug,
        title: attributes.title,
    }));
};

export async function getSlugs(): Promise<string[]> {
    const files = await readdir("./content/reviews");

    const slugs = files.filter((file) => file.endsWith(".md"))
        .map((file) => file.slice(0, -'.md'.length));

    return slugs;
};