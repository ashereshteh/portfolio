pub mod db;
pub mod error;
pub mod features;

use actix_web::middleware::Logger;
use actix_web::{App, HttpServer, dev::Server, web};
use sqlx::PgPool;
use std::net::TcpListener;

pub fn run(listener: TcpListener, pl: PgPool) -> std::io::Result<Server> {
    let pool = web::Data::new(pl);
    let server = HttpServer::new(move || {
        App::new()
            .app_data(pool.clone())
            .wrap(
                Logger::new("ip=%{r}a \"%r\" code=%s size=%b time=%T")
                    .exclude("/.well-known/appspecific/com.chrome.devtools.json"),
            )
            .configure(features::configure)
    })
    .listen(listener)?
    .run();
    Ok(server)
}
