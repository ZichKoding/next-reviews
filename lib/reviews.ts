import { readdir } from "node:fs/promises";
import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

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
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify({
            filters: { slug: {$eq: slug} },
            fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
            populate: { image: { fields: ['url'] } },
            pagination: { pageSize: 1, withCount: false },
        }, { encodeValuesOnly: true });

    const response = await fetch(url);
    const { data } = await response.json();
    const { attributes } = data[0];

    const date = new Date(
        new Date(attributes.publishedAt).setDate(new Date(attributes.publishedAt).getDate() + 1)
    ).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    return {
        slug: attributes.slug,
        title: attributes.title,
        date: date,
        image: CMS_URL + attributes.image.data.attributes.url,
        content: marked(attributes.body),
    };
};

export async function getReviews(): Promise<Review[]> {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify({
            fields: ['slug', 'title', 'subtitle', 'publishedAt'],
            populate: { image: { fields: ['url'] } },
            sort: ['publishedAt:desc'],
            pagination: { pageSize: 6 },
        }, { encodeValuesOnly: true });

    const response = await fetch(url);
    const { data } = await response.json();    

    return data.map(({ attributes }: any) => ({
        slug: attributes.slug,
        title: attributes.title,
        date: attributes.publishedAt,
        image: CMS_URL + attributes.image.data.attributes.url,
    }));
};

export async function getSlugs(): Promise<string[]> {
    const files = await readdir("./content/reviews");

    const slugs = files.filter((file) => file.endsWith(".md"))
        .map((file) => file.slice(0, -'.md'.length));

    return slugs;
};