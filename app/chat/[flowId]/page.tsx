"use client";
import { Toolbar } from "../../components/Toolbar";
import type { Flow } from "@/app/lib/definitions";
import { useState, useEffect, use, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from 'next/navigation';

type Message = {
  session_id: string;
  text: string;
  sender_name: string;
  timestamp: string;
};

async function getFlow(flowId: string): Promise<Flow> {
  const res = await fetch(`http://localhost:5000/api/flows/${flowId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch flow");
  return res.json();
}

function LoadingIndicator() {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-lg max-w-[80%]">
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
  );
}

function ChatContent({ flowId }: { flowId: string }) {
  const router = useRouter();
  const [flow, setFlow] = useState<Flow | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId] = useState(uuidv4());
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const loadFlow = async () => {
      const flowData = await getFlow(flowId);
      setFlow(flowData);
    };
    loadFlow();
  }, [flowId]);

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    try {
      // Add user message to chat
      setMessages(prev => [...prev, {
        session_id: sessionId,
        text: message.trim(),
        sender_name: 'You',
        timestamp: new Date().toISOString()
      }]);
      
      // Show loading state
      setIsLoading(true);
      
      const response = await fetch('/api/langflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flowId,
          sessionId,
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const resultMessage = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          session_id: resultMessage.session_id,
          text: resultMessage.text,
          sender_name: resultMessage.sender_name,
          timestamp: resultMessage.timestamp,
        },
      ]);

      // Clear the input after successful submission
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  if (!flow) return <LoadingChat />;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {flow.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {flow.description}
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Exit chat"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              Start your conversation with {flow.name}
            </p>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg ${
                    msg.sender_name === 'You' 
                      ? 'bg-blue-500 text-white ml-auto' 
                      : 'bg-white dark:bg-gray-800 dark:text-white'
                  } max-w-[80%]`}
                >
                  <div className="font-medium mb-1">{msg.sender_name}</div>
                  <div>{msg.text}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingChat() {
  return (
    <div className="flex-1 p-4">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ flowId: string }> | { flowId: string };
}) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Toolbar />
      <ChatContent flowId={resolvedParams.flowId} />
    </div>
  );
}
