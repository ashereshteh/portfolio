use actix_web::{HttpResponse, ResponseError};
use actix_web::http::StatusCode;

#[derive(Debug, thiserror::Error)]
pub enum AppError {}

impl ResponseError for AppError {
    fn status_code(&self) -> StatusCode {
        StatusCode::INTERNAL_SERVER_ERROR
    }

    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code())
            .body("Internal Server Error!")
    }
}
