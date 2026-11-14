use actix_web::http::StatusCode;
use actix_web::{HttpResponse, ResponseError};

#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("not found: {0}")]
    NotFound(String),

    #[error("bad request: {0}")]
    BadRequest(String),

    #[error("database error: {0}")]
    Database(#[from] sqlx::Error),
}

impl ResponseError for AppError {
    fn status_code(&self) -> StatusCode {
        match self {
            AppError::NotFound(_) => StatusCode::NOT_FOUND,
            AppError::BadRequest(_) => StatusCode::BAD_REQUEST,
            AppError::Database(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        let status = self.status_code();
        if status.is_server_error() {
            log::error!("{self}");
        }

        #[derive(Debug, serde::Serialize)]
        struct ErrResponse {
            code: u16,
            message: String,
            details: String,
        }

        let res = ErrResponse {
            code: status.as_u16(),
            message: match self {
                AppError::NotFound(_) => "Not Found".to_string(),
                AppError::BadRequest(_) => "Bad Request".to_string(),
                _ => "Internal Server Error".to_string(),
            },
            details: match self {
                AppError::NotFound(msg) => msg.to_string(),
                AppError::BadRequest(msg) => msg.to_string(),
                _ => "Nothing to show!".to_string(),
            },
        };

        HttpResponse::build(status).json(res)
    }
}
