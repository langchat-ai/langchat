import { UUID } from '@datastax/astra-db-ts';

export type Flow = {
    flow_id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    status: 'active' | 'draft' | 'archived';
    application: 'Langflow' | 'Langflow Astra';
    endpoint: string;
  };

  export type ChatMessage = {
    id: string;
    flow_id: string;
    session_id: string;
    text: string;
    sender_name: string;
    timestamp: Date;
  };