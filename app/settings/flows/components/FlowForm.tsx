'use client'

import { FormEvent } from 'react';
import { FormField } from "@/app/components/FormField";
import { SelectField } from "@/app/components/SelectField";
import { environments as ENVIRONMENT_OPTIONS } from "@/app/lib/config";
import { Flow } from "@/app/lib/db/flowModel";
import { useRouter } from 'next/navigation';
import * as Form from "@radix-ui/react-form";
import { handleFlow } from '../[...slug]/page';


const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

interface FlowFormProps {
  flow: Omit<Flow, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };
  isNewFlow: boolean;
}

export function FlowForm({ flow, isNewFlow }: FlowFormProps) {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await handleFlow(formData);

      if (!result.success) {
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
      <input type="hidden" name="flowId" value={flow.flowId?.toString() || ""} />
      
      <FormField
        label="Name"
        name="name"
        type="text"
        value={flow.name}
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
        required
      />
      <Form.Submit className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {isNewFlow ? 'Create Flow' : 'Update Flow'}
      </Form.Submit>
    </Form.Root>
  );
} 