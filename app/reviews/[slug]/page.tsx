import Image from "next/image";
import Heading from "@/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/ShareLinkButton";

interface ReviewPageParams {
    slug: string;
}

interface ReviewPageProps {
    params: ReviewPageParams;
}

// export async function generateStaticParams() {
//     const slugs = await getSlugs();
//     return slugs.map( slug => ({ slug }) );
// }

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { slug } }: ReviewPageProps) {
    const review = await getReview(slug);    

    return {
        title: review.title,
        description: review.content,
    };
}

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
    console.log('[ReviewPage] rendering:', slug);

    const review = await getReview(slug);

    return (
        <>
            <Heading>
                {review.title}
            </Heading>
            <p className="font-semibold pb-3">
                {review.subtitle}
            </p>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">
                    {
                        review.date
                    }
                </p>
                <ShareLinkButton />
            </div>
            <Image src={review.image} alt={review.title} priority
                width="640" height="360" className="mb-2 rounded"/>
            <article dangerouslySetInnerHTML={{ __html: review.content }}
                className="max-w-screen-sm prose prose-slate " />
        </>
    );
}