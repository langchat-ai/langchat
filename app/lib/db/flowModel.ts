import { getDb } from "./astradb";
import { UUID , DataAPITime} from "@datastax/astra-db-ts";
import { config } from "../config";

export type Flow = {
  flowId: UUID;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "draft" | "archived";
  application: "Langflow" | "Langflow Astra";
  endpoint?: string;
  environment?: string;
  folder?: string;
  flowEndpoint?: string;
};

export async function getFlowsFromDB(): Promise<Flow[]> {
  try {
    const db = await getDb();
    const flowTable = db.table(config.FLOW_TABLE);
    const flows: Flow[] = []; 

    //to-do: add filter for active flows and based on the user role
    const cursor =  flowTable.find({});
    for await (const document of cursor) {
        const flow: Flow = {
            flowId: document.flowId, 
            name: document.name,
            description: document.description,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
            status: document.status,
            application: document.application,
            endpoint: document.endpoint,
            environment: document.environment,
            folder: document.folder,
            flowEndpoint: document.flowEndpoint,
        };
        flows.push(flow);
    }
    return flows;
  } catch (err) {
    console.error("Error fetching flows:", err);
    throw err;
  }
}

export async function getFlowFromDB(id: string): Promise<Flow> {
  try {
    const db = await getDb();
    const flowTable = db.table(config.FLOW_TABLE);
    const flow = await flowTable.findOne({ flowId: new UUID(id) });
    if (flow && flow.flowId) {
      flow.flowId = flow.flowId.toString();
      return flow as Flow;
    }
    throw new Error("Flow not found");
  } catch (err) {
    console.error("Error fetching flow:", err);
    throw err;
  }
}

export async function createFlow(flow: Flow): Promise<UUID> {
  if (!flow.flowId) {
    flow.flowId = UUID.v4();
  }
  const db = await getDb();
  const flowTable = db.table(config.FLOW_TABLE);
  flow.createdAt = new Date();
  const newFlow = await flowTable.insertOne(flow);
  return newFlow.insertedId as UUID;
}

export async function updateFlow(flow: Omit<Flow, 'flowId'> & { flowId: UUID }): Promise<UUID> {
  const db = await getDb();
  const flowTable = db.table(config.FLOW_TABLE);
  const { flowId, createdAt, ...flowToUpdate } = flow;
  flowToUpdate.updatedAt = new Date();
  console.log(flowToUpdate, flowId);
  const newFlow = await flowTable.updateOne({ flowId: flowId.toString() }, { $set: flowToUpdate });
  console.log(newFlow);
  return flowId;
}
