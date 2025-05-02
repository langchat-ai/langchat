import { UUID, DataAPITime } from "@datastax/astra-db-ts";

export type ChatMessage = { 
  messageId: UUID;
  flowId: UUID;
  sessionId: UUID;
  message: string;
  senderName: string;
  timestamp: Date;
};

export type Message = {
  sessionId: UUID;
  message: string;
  senderName: string;
  timestamp: string;
};

export type SettingSection = {
  title: string;
  description: string;
  key: string;
  url: string;
};

export const SETTINGS_SECTIONS: SettingSection[] = [
  {
    title: "Flow Settings",
    description: "Define the flows and their settings",
    key: "flows",
    url: "/settings/flows",
  },
];

export type Environment = {
  id: string;
  name: string;
  baseUrl: string;
  langflowIdEnvVar: string;
  tokenEnvVar: string;
};

export type Folder = {
  id: string;
  name: string;
  parent: string | null;
  roles: string[];
};

export type Flow = {
  id: string;
  name: string;
  description: string;
  status: string;
};


interface FolderPath {
  id: string;
  description: string;
}