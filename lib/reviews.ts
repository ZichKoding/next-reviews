import { readdir } from "node:fs/promises";
import { marked } from "marked";
import qs from "qs";

export const CACHE_TAG_REVIEWS = "reviews";

const CMS_URL = "http://localhost:1337";

export interface Review {
    title: string;
    subtitle: string;
    date: string;
    content: string;
    image: string;
    slug: string;
};

export interface PaginatedReviews {
    pageCount: number;
    reviews: Review[];
};

export async function getReview(slug: string): Promise<Review | null> {
    const { data }: any = await fetchReviews(
        {
            filters: { slug: {$eq: slug} },
            fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
            populate: { image: { fields: ['url'] } },
            pagination: { pageSize: 1, withCount: false },
        }
    );

    if (data.length === 0) {
        return null;
    }

    const { attributes } = data[0];

    const item = data[0];
    return {
        ...toReview(item),
        content: marked(attributes.body),
    };
};

export async function getReviews(pageSize: number, page?: number): Promise<PaginatedReviews> {
    const { data, meta }: any = await fetchReviews({
        fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        sort: ['publishedAt:desc'],
        pagination: { pageSize, page },
    });

    return {
        pageCount: meta.pagination.pageCount,
        reviews: data.map(toReview),
    };
};

export async function getSlugs(): Promise<string[]> {
    const { data }: any = await fetchReviews({
        fields: ['slug'],
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 100 },
    });

    return data.map((item: any) => item.attributes.slug);
};

async function fetchReviews(parameters: any): Promise<Review[]> {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify(parameters, { encodeValuesOnly: true });

    const response = await fetch(url, {
        next: {
            tags: [CACHE_TAG_REVIEWS],
        }
    });

    if (!response.ok) {
        throw new Error(`CMS returned ${response.status} for ${url}`);
    }

    return await response.json();
};

function toReview(item: any) {
    const { attributes } = item;

    const date = new Date(attributes.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    return {
        slug: attributes.slug,
        title: attributes.title,
        subtitle: attributes.subtitle,
        date: date,
        image: CMS_URL + attributes.image.data.attributes.url,
    };
}