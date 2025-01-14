import { Toolbar } from '../components/Toolbar';
import { Flow } from '@/app/lib/definitions';
import { Suspense } from 'react';
import Link from 'next/link';

async function getFlows(): Promise<Flow[]> {
  const res = await fetch('http://localhost:5000/api/flows', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch flows');
  return await res.json();
}

function ChatIcon() {
  return (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
      />
    </svg>
  );
}

async function FlowsList() {
  const flows = await getFlows() || [];
  console.log(flows);
  return (
    <div className="mt-8 space-y-4">
      {flows.map((flow) => (
        <div 
          key={flow.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{flow.name}</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{flow.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${flow.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                ${flow.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                ${flow.status === 'archived' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' : ''}
              `}>
                {flow.status} {flow.id.toString()}
              </span>
              <Link 
                href={`/chat/`}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Start chat"
              >
                <ChatIcon />
              </Link>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date(flow.updatedAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingFlows() {
  return (
    <div className="mt-8 space-y-4">
      {[1, 2, 3].map((i) => (
        <div 
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse"
        >
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toolbar />
      <main className="flex flex-col items-center p-8">
        <div className="max-w-5xl w-full">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Your active conversation flows</p>
          
          <Suspense fallback={<LoadingFlows />}>
            <FlowsList />
          </Suspense>
        </div>
      </main>
    </div>
  );
} 