import { UUID } from '@datastax/astra-db-ts';

export type Flow = {
    flow_id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    status: string;
    application: string; 
    endpoint: string;
    environment?: string;
  };

  export type ChatMessage = {
    id: string;
    flow_id: string;
    session_id: string;
    user_id: string;
    text: string;
    sender_name: string;
    timestamp: Date;
  };