use actix_web::web;

pub mod handlers;
mod models;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/quotes").service(handlers::random));
}
