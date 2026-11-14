const snippet = `#[get("")]
pub async fn random(pool: web::Data<PgPool>) -> Result<HttpResponse, AppError> {
    let some_quote = repositories::random(&pool).await?;

    let Some(quote) = some_quote else {
        return Err(AppError::NotFound("QUOTE_NOT_FOUND".into()));
    };

    Ok(HttpResponse::Ok().json(quote))
}

pub async fn connect(url: &str) → Result<PgPool, sqlx::Error> {
    PgPoolOptions::new()
        .max_connections(10)
        .acquire_timeout(Duration::from_secs(5))
        .connect(url)
        .await
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = db::connect(&url).await?;
    sqlx::migrate!().run(&pool).await?;
    run(listener, pool)?.await
}

`;

function Column({ className = "" }: { className?: string }) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <div className="motion-safe:animate-code-scroll">
                <pre className="font-mono text-xs leading-6 sm:text-sm sm:leading-7">{snippet}</pre>
                <pre className="font-mono text-xs leading-6 sm:text-sm sm:leading-7">{snippet}</pre>
            </div>
        </div>
    );
}

export function CodeBackground() {
    return (
        <div
            aria-hidden
            dir="ltr"
            className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
        >
            <div className="flex h-full justify-between px-5 text-accent opacity-[0.07] mask-[radial-gradient(ellipse_at_center,transparent_35%,black_90%)] sm:px-8 md:opacity-[0.12]">
                <Column className="w-full md:w-88" />
                <Column className="hidden w-88 md:block [&>div]:[animation-direction:reverse]" />
            </div>
        </div>
    );
}
