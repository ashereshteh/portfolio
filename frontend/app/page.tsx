import { Suspense } from "react";
import { CodeBackground } from "./components/CodeBackground";
import { QuoteCard, QuoteCardSkeleton } from "./components/QuoteCard";

export default function Home() {
    return (
        <section className="relative isolate overflow-hidden">
            <CodeBackground />

            <div className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center gap-12 px-5 py-20 sm:px-8 lg:gap-16">
                <header className="flex flex-col items-start gap-5">
                    <h1 className="pb-1 text-4xl font-bold leading-[1.3] motion-safe:animate-fade-up [animation-delay:100ms] sm:text-6xl lg:text-7xl">
            <span className="bg-[linear-gradient(100deg,var(--accent)_0%,var(--accent)_38%,#ffffff_50%,var(--accent)_62%,var(--accent)_100%)] bg-size-[300%_100%] bg-clip-text text-transparent motion-safe:animate-shine">
  امیرحسین عمادی
</span>
                    </h1>

                    <p className="text-xl font-bold text-accent motion-safe:animate-fade-up [animation-delay:250ms] sm:text-2xl">
                        توسعه‌دهنده نرم‌افزار
                    </p>

                    <p className="max-w-2xl text-base leading-8 text-muted motion-safe:animate-fade-up [animation-delay:400ms] sm:text-lg sm:leading-9">
                        مدتی است که با Rust کار می‌کنم و بیشتر دنبال ساختن backend های پایدار
                        و سریعم. گاهی هم سراغ چیزهای دیگر مثل بازی‌سازی با Rust می‌روم.
                    </p>
                </header>

                <div className="max-w-2xl motion-safe:animate-fade-up [animation-delay:600ms]">
                    <Suspense fallback={<QuoteCardSkeleton />}>
                        <QuoteCard />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
