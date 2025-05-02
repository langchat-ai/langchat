"use server";
import { Toolbar } from '../../components/Toolbar';
import { Flow } from '@/app/lib/db/flowModel';
import { Table } from '@radix-ui/themes';
import { getFlowsFromDB } from '@/app/lib/db/flowModel';
import { NavigateButton } from '@/app/components/NavigateButton';

export default async function FlowsPage() {
  const flows = await getFlowsFromDB();
  const loading = false;


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toolbar />
      <main className="flex flex-col p-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-12">Manage Flows</h1>
              <p className="mt-2 text-slate-11">Add and manage your conversation flows</p>
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
                    <Table.ColumnHeaderCell>
                      Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      Description
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      Actions
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {Object.entries(
                    flows.reduce((acc, flow) => {
                      const folder = flow.folder || 'Ungrouped';
                      return {
                        ...acc,
                        [folder]: [...(acc[folder] || []), flow],
                      };
                    }, {} as Record<string, Flow[]>)
                  ).map(([folder, folderFlows]) => (
                    <>
                      <Table.Row 
                        key={`folder-${folder}`}
                        className="bg-slate-5 dark:bg-slate-6"
                      >
                        <Table.Cell 
                          className="px-6 py-3 text-sm font-semibold text-slate-12" 
                          colSpan={3}
                        >
                          {folder}
                        </Table.Cell>
                      </Table.Row>
                      {folderFlows.map((flow) => (
                        <Table.Row 
                          key={flow.flowId.toString()}
                          className="hover:bg-slate-3 dark:hover:bg-slate-4"
                        >
                          <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-12">
                            {flow.name}
                          </Table.Cell>
                          <Table.Cell className="px-6 py-4 text-sm text-slate-11">
                            {flow.description || '-'}
                          </Table.Cell>
                          <Table.Cell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <NavigateButton
                              href={`/settings/flows/edit/${flow.flowId.toString()}`}
                              className="inline-flex items-center px-3 py-1.5 rounded-md bg-slate-3 dark:bg-slate-4 text-slate-12 hover:bg-slate-4 dark:hover:bg-slate-5 border border-slate-7 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-8"
                            >
                              Edit
                            </NavigateButton>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </>
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