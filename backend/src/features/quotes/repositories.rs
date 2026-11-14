use super::models::Quote;
use sqlx::PgPool;

pub async fn random(pool: &PgPool) -> Result<Option<Quote>, sqlx::Error> {
    sqlx::query_as!(
        Quote,
        "SELECT id, sentence, owner, created_at FROM quotes ORDER BY id
        OFFSET (SELECT (current_date - date '2026-01-01') % count(*) FROM quotes)
        LIMIT 1",
    )
    .fetch_optional(pool)
    .await
}
