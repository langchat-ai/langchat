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

export const config = {
  FLOW_TABLE: "langchat_flows",
  SESSION_TABLE: "langchat_sessions",
  MESSAGE_TABLE: "langchat_messages",
};

export type Environment = {
  id: string;
  name: string;
  baseUrl: string;
  langflowIdEnvVar: string;
  tokenEnvVar: string;
};

export const environments: Environment[] = [
  {
    id: "lf_astra",
    name: "Langflow Astra PRD",
    baseUrl: "https://<LANGFLOW_ASTRA_URL>/api/v1/run/",
    langflowIdEnvVar: "LANGFLOW_ASTRA_ID",
    tokenEnvVar: "LANGFLOW_ASTRA_TOKEN",
  },
  {
    id: "lf_astra_dev",
    name: "Langflow Astra DEV",
    baseUrl: "https://<LANGFLOW_ASTRA_DEV_URL>/api/v1/run/",
    langflowIdEnvVar: "LANGFLOW_ASTRA_DEV_ID",
    tokenEnvVar: "LANGFLOW_ASTRA_DEV_TOKEN",
  },
  {
    id: "localhost",
    name: "Langflow Local",
    baseUrl: "http://localhost:3000/api/v1/run/",
    langflowIdEnvVar: "LANGFLOW_LOCAL_ID",
    tokenEnvVar: "LANGFLOW_LOCAL_TOKEN",
  },
];
