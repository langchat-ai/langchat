import { UUID } from '@datastax/astra-db-ts';

export type Flow = {
    id: UUID;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    status: 'active' | 'draft' | 'archived';
    application: 'Langflow' | 'Langflow Astra';
    endpoint: string;
  };

  export type ChatMessage = {
    id: UUID;
    flow_id: UUID;
    session_id: UUID;
    text: string;
    sender_name: string;
    timestamp: Date;
  };