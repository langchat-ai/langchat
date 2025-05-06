'use client'

import { FormEvent, useState } from 'react';
import { FormField } from "@/app/components/FormField";
import { SelectField } from "@/app/components/SelectField";
import { environments as ENVIRONMENT_OPTIONS } from "@/app/lib/settings";
import { Flow } from "@/app/lib/definitions";
import { useRouter } from 'next/navigation';
import * as Form from "@radix-ui/react-form";

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

interface FlowFormProps {
  flow: Omit<Flow, 'created_at' | 'updated_at'> & {
    created_at: string;
    updated_at: string;
  };
  isNewFlow: boolean;
}

export function FlowForm({ flow: initialFlow, isNewFlow }: FlowFormProps) {
  const router = useRouter();
  const [flow, setFlow] = useState(initialFlow);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      // Convert FormData to JSON object
      const flowData = {
        flow_id: formData.get('flow_id')?.toString(),
        name: formData.get('name')?.toString(),
        environment: formData.get('environment')?.toString(),
        status: formData.get('status')?.toString(),
        description: formData.get('description')?.toString(),
        // Include other fields as needed
      };
      
      const response = await fetch('/api/flows/manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowData),
      });
      
      if (!response.ok) {
        throw new Error(isNewFlow ? 'Failed to create flow' : 'Failed to update flow');
      }
      
      router.refresh(); // Refresh the server components
      router.push('/settings/flows');
    } catch (error) {
      console.error('Error managing flow:', error);
      // Handle error (show toast notification, etc.)
    }
  }

  return (
    <Form.Root onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="flow_id" value={flow.flow_id?.toString() || ""} />
      
      <FormField
        label="Name"
        name="name"
        type="text"
        value={flow.name}
        onChange={(value) => setFlow({ ...flow, name: value })}
        required
      />
      
      <FormField
        label="Description"
        name="description"
        type="text"
        value={flow.description}
        onChange={(value) => setFlow({ ...flow, description: value })}
        required
      />

      <FormField
        label="Endpoint"
        name="endpoint"
        type="text"
        value={flow.endpoint}
        onChange={(value) => setFlow({ ...flow, endpoint: value })}
        required
      />      


      <SelectField
        label="Environment"
        name="environment"
        options={ENVIRONMENT_OPTIONS.map(env => ({
          value: env.id,
          label: env.name
        }))}
        value={flow.environment}
        onChange={(value) => setFlow({ ...flow, environment: value })}
        required
      />
      
      <SelectField
        label="Status"
        name="status"
        options={STATUS_OPTIONS.map(status => ({
          value: status.value,
          label: status.label
        }))}
        value={flow.status}
        onChange={(value) => setFlow({ ...flow, status: value as "active" | "draft" | "archived" })}
        required
      />
      <Form.Submit className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {isNewFlow ? 'Create Flow' : 'Update Flow'}
      </Form.Submit>
    </Form.Root>
  );
} 