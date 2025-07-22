CREATE TABLE IF NOT EXISTS eebus (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    description TEXT,
    channel VARCHAR(255) NOT NULL,
)