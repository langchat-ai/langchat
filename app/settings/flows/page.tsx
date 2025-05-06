"use client";
import { Toolbar } from "../../components/Toolbar";
import { Flow } from "@/app/lib/definitions";
import { Table } from "@radix-ui/themes";
import { NavigateButton } from "@/app/components/NavigateButton";
import { useState } from "react";
import { useEffect } from "react";

export default function FlowsPage() {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const response = await fetch("/api/flows/manage");
        if (response.ok) {
          const data = await response.json();
          setFlows(data);
        } else {
          console.error("Failed to fetch flows");
        }
      } catch (error) {
        console.error("Error fetching flows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlows();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toolbar />
      <main className="flex flex-col p-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-12">Manage Flows</h1>
              <p className="mt-2 text-slate-11">
                Add and manage your conversation flows
              </p>
            </div>
            <NavigateButton
              href="/settings/flows/new"
              className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-9 text-slate-1 hover:bg-indigo-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-8"
            >
              Create New Flow
            </NavigateButton>
          </div>

          <div className="mt-8 bg-slate-2 dark:bg-slate-3 rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-6 text-slate-11">Loading flows...</div>
            ) : flows.length === 0 ? (
              <div className="p-6 text-slate-11">No flows created yet</div>
            ) : (
              <Table.Root className="w-full">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {flows.map((flow) => (
                    <Table.Row
                      key={flow.flow_id.toString()}
                      className="hover:bg-slate-3 dark:hover:bg-slate-4"
                    >
                      <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-12">
                        {flow.name}
                      </Table.Cell>
                      <Table.Cell className="px-6 py-4 text-sm text-slate-11">
                        {flow.description || "-"}
                      </Table.Cell>
                      <Table.Cell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <NavigateButton
                          href={`/settings/flows/edit/${flow.flow_id.toString()}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-md bg-slate-3 dark:bg-slate-4 text-slate-12 hover:bg-slate-4 dark:hover:bg-slate-5 border border-slate-7 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-8"
                        >
                          Edit
                        </NavigateButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
