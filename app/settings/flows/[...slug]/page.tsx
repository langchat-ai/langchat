import { redirect } from "next/navigation";
import { Toolbar } from "../../../components/Toolbar";
import { Flow, getFlowFromDB } from "@/app/lib/db/flowModel";
import { FlowForm } from "@/app/settings/flows/components/FlowForm";

interface FormFlow extends Omit<Flow, 'flowId'> {
  flowId: string;
}

export async function handleFlow(formData: FormData) {
  'use server'
  
  const flow = {
    flowId: formData.get('flowId'),
    name: formData.get('name'),
    description: formData.get('description'),
    status: formData.get('status'),
    environment: formData.get('environment'),
    folder: formData.get('folder'),
    flowEndpoint: formData.get('flowEndpoint'),
  };

  try {
    const url = "/api/flows/manage";
    const isNewFlow = !flow.flowId;

    const flowToSend = {
      ...flow,
      flowId: isNewFlow ? null : flow.flowId?.toString()
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flowToSend),
    });

    if (!response.ok) {
      throw new Error(isNewFlow ? 'Failed to create flow' : 'Failed to update flow');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error managing flow:', error);
    return { success: false, error };
  }
}

export default async function EditFlowPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slugParams = await Promise.resolve(params);
  const isNewFlow = !slugParams || slugParams.slug?.[0] === "new";
  const flowId = slugParams?.slug?.[1];

  let flow: FormFlow = {
    flowId: "",
    name: "",
    description: "",
    status: "draft",
    environment: "",
    flowEndpoint: "",
    folder: "/",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    application: "Langflow"
  };

  if (!isNewFlow && flowId) {
    const flowFromDB = await getFlowFromDB(flowId);
    flow = {
      ...flowFromDB,
      flowId: flowFromDB.flowId.toString(),
      createdAt: flowFromDB.createdAt instanceof Date 
        ? flowFromDB.createdAt.toISOString() 
        : flowFromDB.createdAt,
      updatedAt: flowFromDB.updatedAt instanceof Date 
        ? flowFromDB.updatedAt.toISOString() 
        : flowFromDB.updatedAt,
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toolbar />
      <main className="flex flex-col p-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isNewFlow ? "Create New Flow" : "Edit Flow"}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isNewFlow
                ? "Create a new conversation flow"
                : "Modify your conversation flow"}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <FlowForm flow={flow} isNewFlow={isNewFlow} />
          </div>
        </div>
      </main>
    </div>
  );
}

