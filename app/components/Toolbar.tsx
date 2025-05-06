"use client";
import Link from "next/link";

export function Toolbar() {

  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/dashboard"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Langchat AI
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/settings"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}
