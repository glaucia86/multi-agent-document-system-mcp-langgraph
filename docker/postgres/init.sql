-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create schema for better organization
CREATE SCHEMA IF NOT EXISTS app;

-- Set search path
ALTER DATABASE multi_agent_system SET search_path TO app, public;

-- Grant privileges
GRANT ALL ON SCHEMA app TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA app TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA app TO postgres;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION app.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';