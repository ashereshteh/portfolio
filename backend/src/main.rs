use std::net::TcpListener;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();

    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    let addr = std::env::var("BIND_ADDR").unwrap_or_else(|_| "127.0.0.1:8080".into());
    let listener = TcpListener::bind(addr)?;

    let url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set!");
    let pool = backend::db::connect(&url)
        .await
        .expect("failed to connect to database!");

    sqlx::migrate!(".//migrations")
        .run(&pool)
        .await
        .expect("failed to run database migrations!");

    backend::run(listener, pool)?.await
}
