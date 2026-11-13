import {Suspense} from "react";

type Quote = {
    id: number;
    sentence: string;
    owner: string;
}

async function GetQuote() {
    const res = await fetch(`${process.env.API_URL}/api/v1/quotes`);
    if (!res.ok) {
        throw new Error("Failed to fetch quotes!");
    }

    const quote: Quote = await res.json();

    return (
        <figure>
            <blockquote>{quote.sentence}</blockquote>
            <figcaption><cite>{quote.owner}</cite></figcaption>
        </figure>
    );
}

export default function Home() {
    return (
        <>
            <h1>امیرحسین عمادی</h1>
            <p>متن به عنوان تست!</p>
            <hr/>
            <Suspense fallback={<p>درحال بارگذاری...</p>}>
                <GetQuote/>
            </Suspense>
        </>
    );
}
