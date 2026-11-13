#[derive(Debug, serde::Serialize)]
pub struct Quote {
    pub id: i64,
    pub sentence: String,
    pub owner: String,
}
