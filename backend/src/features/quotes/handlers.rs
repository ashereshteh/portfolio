use actix_web::{get, HttpResponse};
use super::models::Quote;

#[get("")]
pub async fn random() -> HttpResponse {
    HttpResponse::Ok().json(Quote {
        id: 1,
        sentence: "گشتم نبود ، نگرد نیست!".to_string(),
        owner: "امیرحسین عمادی".to_string(),
    })
}
