import { Environment } from "./definitions";

export const config = {
  FLOW_TABLE: "langchat_flows",
  SESSION_TABLE: "langchat_sessions",
  MESSAGE_TABLE: "langchat_messages"}

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

export const folders: Folder[] = [
  {
    id: "620e4237-ee74-442c-850f-3d3b64dda413",
    name: "/",
    parent: null,
    roles: ["*"],
  },
  {
    id: "fe27b72c-41c8-4c93-ac94-7a32aeff93be",
    name: "Finance",
    parent: "620e4237-ee74-442c-850f-3d3b64dda413",
    roles: ["admin", "finance_users"],
  },
  {
    id: "86acae2d-5950-4dc1-bf9c-f39b06a76218",
    name: "HR",
    parent: "fe27b72c-41c8-4c93-ac94-7a32aeff93be",
    roles: ["admin", "hr_users"],
  },
  {
    id: "d9779083-f56a-499e-a551-ad4f90683ae8",
    name: "HR",
    parent: "620e4237-ee74-442c-850f-3d3b64dda413",
    roles: ["admin", "hr_users"],
  },
];

export const getFolderHierarchy = (folderId: string | null): FolderPath[] => {
  var folder = null;
  if (!folderId) folder = folders.find((f) => f.parent === null);
  else folder = folders.find((f) => f.id === folderId);

  if (!folder) return [];

  const parentFolders = getFolderHierarchy(folder.parent);
  const parentPath = parentFolders.map((f) => f.description).join("/");

  return [
    ...parentFolders,
    {
      id: folder.id,
      description: parentPath ? `${parentPath}/${folder.name}` : folder.name,
    },
  ];
};
