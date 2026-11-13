use super::models::Quote;
use crate::error::AppError;
use actix_web::{HttpResponse, get};

#[get("")]
pub async fn random() -> Result<HttpResponse, AppError> {
    Ok(HttpResponse::Ok().json(Quote {
        id: 1,
        sentence: "گشتم نبود ، نگرد نیست!".to_string(),
        owner: "امیرحسین عمادی".to_string(),
    }))
}
