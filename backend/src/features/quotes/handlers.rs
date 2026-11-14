use crate::error::AppError;
use actix_web::{HttpResponse, get, web};
use sqlx::PgPool;

#[get("")]
pub async fn random(pool: web::Data<PgPool>) -> Result<HttpResponse, AppError> {
    let some_quote = super::repositories::random(&pool).await?;

    let Some(quote) = some_quote else {
        return Err(AppError::NotFound("QUOTE_NOT_FOUND".to_string()));
    };

    Ok(HttpResponse::Ok().json(quote))
}
