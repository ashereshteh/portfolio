pub mod error;
pub mod features;

use actix_web::middleware::Logger;
use actix_web::{App, HttpServer, dev::Server};
use std::net::TcpListener;

pub fn run(listener: TcpListener) -> std::io::Result<Server> {
    let server = HttpServer::new(|| {
        App::new()
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
