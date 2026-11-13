use std::net::TcpListener;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();

    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    let addr = std::env::var("BIND_ADDR").unwrap_or_else(|_| "127.0.0.1:8080".into());
    log::info!("server listening on http://{addr}");
    let listener = TcpListener::bind(addr)?;
    backend::run(listener)?.await
}
