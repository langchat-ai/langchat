CREATE TABLE IF NOT EXISTS langchat_messages (
  id uuid,
  flow_id text,
  session_id text,
  text text,
  sender_name text,
  timestamp timestamp,
  PRIMARY KEY ((flow_id, session_id), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);

CREATE TABLE IF NOT EXISTS langchat_flows (
  id uuid,
  name text,
  description text,
  created_at timestamp,
  updated_at timestamp,
  status text,
  application text,
  endpoint text,
  PRIMARY KEY (id)
);
