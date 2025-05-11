"use client"
import { redirect } from "next/navigation";
import { Toolbar } from "../../../components/Toolbar";
import { FlowForm } from "@/app/settings/flows/components/FlowForm";
import { useEffect, useState } from "react";
import { Flow } from "@/app/lib/definitions";
import { use } from "react";

export default function EditFlowPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  // Unwrap params
  const unwrappedParams = use(params);
  
  const [flow, setFlow] = useState<Flow>({
    flow_id: "",
    name: "",
    description: "",
    status: "draft",
    application: "Langflow",
    endpoint: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFlow = async () => {
      const isNewFlow = !unwrappedParams || unwrappedParams.slug?.[0] === "new";
      const flow_id = unwrappedParams?.slug?.[1];
      
      if (!isNewFlow && flow_id) {
        setLoading(true);
        try {
          const response = await fetch(`/api/flows/manage/${flow_id}`);
          if (response.ok) {
            const flowData = await response.json();
            setFlow({
              ...flowData,
              flow_id: flowData.flow_id.toString(),
              created_at: flowData.created_at instanceof Date 
                ? flowData.created_at.toISOString() 
                : flowData.created_at,
              updated_at: flowData.updated_at instanceof Date 
                ? flowData.updated_at.toISOString() 
                : flowData.updated_at,
            });
          } else {
            console.error("Failed to fetch flow data");
          }
        } catch (error) {
          console.error("Error fetching flow:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFlow();
  }, [unwrappedParams]);

  const isNewFlow = !unwrappedParams || unwrappedParams.slug?.[0] === "new";

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
            {loading ? (
              <div className="flex justify-center p-4">Loading flow data...</div>
            ) : (
              <FlowForm flow={flow} isNewFlow={isNewFlow} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

