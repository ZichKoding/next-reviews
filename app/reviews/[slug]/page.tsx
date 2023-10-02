import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

interface ReviewPageProps {
    params: {
        slug: string;
    };
}

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
    const review = await getReviews(slug);

    return (
        <>
            <Heading>
                {review.title}
            </Heading>
            <p className="italic pb-2">
                {
                    review.date
                }
            </p>
            <img src={review.image} alt="Stardew Valley" 
                width="640" height="360" className="mb-2 rounded"/>
            <article dangerouslySetInnerHTML={{ __html: review.content }}
                className="max-w-screen-sm prose prose-slate " />
        </>
    );
}