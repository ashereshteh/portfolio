use actix_web::web;

pub mod quotes;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/v1")
            .configure(quotes::configure),
    );
}
