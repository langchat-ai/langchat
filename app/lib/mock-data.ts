import type { Flow } from './definitions';

export const mockFlows: Flow[] = [
    {
      id: 'b5ae9653-f378-4f83-9379-406cc6007b52',
      name: 'United Airlines RAG',
      description: 'Handles basic customer inquiries and support tickets',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      status: 'active',
      application: 'Langflow',
      endpoint: `${process.env.LANGFLOW_API_URL}/api/v1/run/e99de55a-86ec-4248-b176-3fcf051c578d?stream=false`,
    },
    {
      id: 'c0c33beb-d33a-4f71-a5bd-91a51fc44f2a',
      name: 'Sales Assistant',
      description: 'Helps qualify leads and answer product questions',
      createdAt: '2024-01-16T15:30:00Z',
      updatedAt: '2024-01-16T15:30:00Z',
      status: 'draft',
      application: 'Langflow',
      endpoint: `${process.env.LANGFLOW_API_URL}/api/v1/run/e99de55a-86ec-4248-b176-3fcf051c578d?stream=false`,
    },
    {
      id: '0a0b8103-a80c-4905-ac06-035faa05b91d',
      name: 'Onboarding Guide',
      description: 'Assists new users with product onboarding',
      createdAt: '2024-01-17T09:15:00Z',
      updatedAt: '2024-01-17T09:15:00Z',
      status: 'active',
      application: 'Langflow',
      endpoint: `${process.env.LANGFLOW_API_URL}/api/v1/run/e99de55a-86ec-4248-b176-3fcf051c578d?stream=false`,
    },
  ];