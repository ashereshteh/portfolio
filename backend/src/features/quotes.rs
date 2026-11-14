use actix_web::web;

mod handlers;
mod models;
mod repositories;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/quotes").service(handlers::random));
}
