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

function getToday() {
    const now = new Date();
    const timeZone = "Asia/Tehran";

    const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone,
    }).formatToParts(now);

    const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? "";

    return {
        iso: new Intl.DateTimeFormat("en-CA", {timeZone}).format(now),
        // خروجی: «شنبه - ۲۳ آبان ۱۴۰۵»
        label: `${get("weekday")} - ${get("day")} ${get("month")} ${get("year")}`,
    };
}

function QuoteIcon() {
    return (
        <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>
            <path
                d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>
        </svg>
    );
}

export async function QuoteCard() {
    const quote = await fetchQuote();
    if (!quote) return null;

    const {iso, label} = getToday();

    return (
        <section aria-label="جمله‌ی بزرگان" className="flex flex-col gap-3">
            <p className="flex items-center gap-2.5 text-sm text-muted sm:text-base">
        <span aria-hidden className="relative flex size-2">
          <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping"/>
          <span className="relative inline-flex size-2 rounded-full bg-accent"/>
        </span>
                <span>جمله‌ی امروز</span>
                <span aria-hidden>·</span>
                <time dateTime={iso}>{label}</time>
            </p>

            <figure
                className="flex flex-col gap-5 rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_40px_-12px] hover:shadow-accent/25 sm:p-8">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <QuoteIcon/>
                </div>

                <blockquote className="text-lg leading-9 text-foreground sm:text-xl sm:leading-10">
                    {quote.sentence}
                </blockquote>

                <figcaption className="flex items-center gap-3 text-sm sm:text-base">
          <span
              aria-hidden
              className="h-px w-8 origin-right bg-accent/70 motion-safe:animate-draw [animation-delay:1000ms]"
          />
                    <cite className="font-bold not-italic text-accent">{quote.owner}</cite>
                </figcaption>
            </figure>
        </section>
    );
}

export function QuoteCardSkeleton() {
    return (
        <div aria-hidden
             className="h-44 animate-pulse rounded-2xl border border-border bg-surface/60"/>
    );
}
