import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import { Metadata } from "next";

export const revalidate = 30; // seconds

export const metadata: Metadata = {
    title: "Reviews",
};

export default async function ReviewsPage() {
    const reviews = await getReviews(6);

    console.log('[ReviewsPage] rendering:', 
        reviews.map(review => review.slug).join(', '));

    return (
        <>
            <Heading>
                Reviews
            </Heading>
            <p>
                Here are a list of reviews. Click on one to read more.
            </p>
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