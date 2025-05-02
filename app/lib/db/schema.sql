CREATE TABLE default_keyspace.langchat_sessions (
    "userId" UUID,
    "flowId" UUID,
    "sessionId" UUID,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "summary" text,
    PRIMARY KEY (("userId", "flowId"), "sessionId")
);


CREATE TABLE default_keyspace.langchat_messages (
    "flowId" UUID,
    "sessionId" UUID,
    "messageId" uuid,
    "timestamp" timestamp,
    "senderName" text,
    "message" text,
    "feedback" text,
    PRIMARY KEY (("flowId", "sessionId"), "messageId")
) WITH CLUSTERING ORDER BY ("messageId" DESC);

CREATE TABLE default_keyspace.langchat_flows (
    "flowId" uuid PRIMARY KEY,
    "application" text,
    "createdAt" timestamp,
    "description" text,
    "endpoint" text,
    "environment" text,
    "flowEndpoint" text,
    "folder" text,
    "name" text,
    "status" text,
    "updatedAt" timestamp
);