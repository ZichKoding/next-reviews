import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import { Metadata } from "next";

interface ReviewsPageProps {
    searchParams: { page?: string};
}

export const metadata: Metadata = {
    title: "Reviews",
};

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
    const page =  parsePageParam(searchParams.page);
    const reviews = await getReviews(PAGE_SIZE, page);

    console.log('[ReviewsPage] reviews', page);

    return (
        <>
            <Heading>
                Reviews
            </Heading>
            <div>
                <Link href={`/reviews?page=${page - 1}`} passHref>&lt;</Link>
                <span>Page {page}</span>
                <Link href={`/reviews?page=${page + 1}`} passHref>&gt;</Link>
            </div>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review, index) => (
                    <li key={review.slug}
                        className="bg-white border rounded shadow w-80 hover:shadow-xl">
                        <Link href={`/reviews/${review.slug}`}>
                            <Image src={review.image} alt={review.title} priority={index === 0}
                                width="320" height="180" className="mb-2 rounded-t"/>
                            <h2 className="font-semibold font-orbitron py-1 text-center"> 
                                {review.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

function parsePageParam(paramValue: string): number {
    if (paramValue) {
        const page = parseInt(paramValue, 10);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 1;
}