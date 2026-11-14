import {Suspense} from "react";
import {z} from "zod";

const QuoteSchema = z.object({
   sentence: z.string(),
   owner: z.string(),
});

type Quote = z.infer<typeof QuoteSchema>;

async function fetchQuote(): Promise<Quote | null> {
    const baseURL = process.env.API_URL;
    if (!baseURL) throw new Error("API_URL is not set!");

    let res: Response;
    try {
        res = await fetch(`${baseURL}/api/v1/quotes`, {
            signal: AbortSignal.timeout(5000), // timeout: 5s
        });
    } catch (err) {
        console.error("Quote fetch failed (network/timeout):", err);
        return null;
    }

    if (res.status === 404) {
        console.log("Quote not found!");
        return null
    }

    if (!res.ok) {
        console.error(`Quote fetch failed: ${res.status}`);
        return null;
    }

    const parsed = QuoteSchema.safeParse(await res.json());
    if (!parsed.success) {
        console.error("Invalid quote response:", parsed.error);
        return null;
    }

    return parsed.data;
}

async function QuoteSection() {
    const quote = await fetchQuote();
    if (!quote) return null; // skeleton ...

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
                <QuoteSection/>
            </Suspense>
        </>
    );
}
