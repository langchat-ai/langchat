import { Toolbar } from '../../components/Toolbar';

export default function FlowsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toolbar />
      <main className="flex flex-col p-8">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Flows</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Create and manage your conversation flows</p>
          
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-gray-500 dark:text-gray-400">No flows created yet</div>
          </div>
        </div>
      </main>
    </div>
  );
} 