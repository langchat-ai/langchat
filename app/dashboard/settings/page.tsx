import { Toolbar } from '../../components/Toolbar';
import { SETTINGS_SECTIONS } from '@/app/lib/definitions';
import Link from 'next/link';

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
              {SETTINGS_SECTIONS.map((section, index) => (
                <div 
                  key={section.key}
                  className={index < SETTINGS_SECTIONS.length - 1 ? "border-b border-gray-200 dark:border-gray-700 pb-6" : ""}
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
                  <Link
                    href={section.url}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Configure
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 