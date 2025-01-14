import { Toolbar } from '../../components/Toolbar';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toolbar />
      <main className="flex flex-col p-8">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Configure your application settings</p>
          
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">General Settings</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Basic application settings and configurations</p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Configuration</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your API keys and endpoints</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Configure your notification preferences</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 