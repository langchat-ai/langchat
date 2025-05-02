CREATE TABLE IF NOT EXISTS langchat_messages (
  message_id uuid,
  flow_id text,
  session_id text,
  text text,
  sender_name text,
  timestamp timestamp,
  PRIMARY KEY ((flow_id, session_id), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);

CREATE TABLE IF NOT EXISTS langchat_flows (
  flow_id uuid,
  name text,
  description text,
  created_at timestamp,
  updated_at timestamp,
  status text,
  application text,
  endpoint text,
  PRIMARY KEY (id)
);

CREATE TABLE langchat_sessions (
    user_id text,
    flow_id text,
    session_id text,
    created_at timestamp,
    summary text,
    updated_at timestamp,
    PRIMARY KEY ((user_id, flow_id), session_id)
) WITH CLUSTERING ORDER BY (session_id ASC);
