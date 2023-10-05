import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export const revalidate = 30; // seconds

export default async function HomePage() {
    const reviews = await getReviews(3);

    console.log('[HomePage] rendering:', 
        reviews.map(review => review.slug).join(', '));

    return (
        <>
            <Heading>
                Indie Gamer
            </Heading>
            <p className="pb-3">
                Only the best indie games, reviewed for you. 
            </p>
            <ul className="flex flex-col gap-3">
                {reviews.map((review, index) => (
                    <li key={review.slug}
                        className="bg-white border rounded shadow w-80 
                                    hover:shadow-xl sm:w-full">
                        <Link href={`/reviews/${review.slug}`}
                            className="flex flex-col sm:flex-row">
                            <Image src={review.image} alt={review.title} priority={index === 0}
                                width="320" height="180" className="mb-2 rounded-t" />
                            <div className="px-2 py-1 text-center sm:text-left">
                                <h2 className="font-orbitron font-semibold">
                                    {review.title}
                                </h2>
                                <p className="hidden pt-2 sm:block">
                                    {review.subtitle}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}