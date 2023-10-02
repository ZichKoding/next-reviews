import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export default async function StardewValleyPage() {
    const review = await getReviews('stardew-valley');

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