use chrono::{DateTime, Utc};

#[derive(Debug, serde::Serialize)]
pub struct Quote {
    pub id: i64,
    pub sentence: String,
    pub owner: String,
    pub created_at: DateTime<Utc>,
}
