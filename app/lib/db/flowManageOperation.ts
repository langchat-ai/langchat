import { getDb } from "./astradb";
import { ChatMessage, Flow } from "../definitions";
import { v4 as uuidv4 } from 'uuid';
import { config } from "../settings";
const db = await getDb();

export async function getFlows(): Promise<Flow[]> {
  try {
    const flowTable = db.table<Flow>(config.FLOW_TABLE);
    const flows = await flowTable.find({});
    const res: Flow[] = [];

    for await (const flow of flows) {
      flow.flow_id = flow.flow_id.toString();
      res.push(flow as Flow);
    }
    console.log("flows queries", res);
    return res;
  } catch (err) {
    console.error("Error fetching flows:", err);
    throw err;
  }
}

export async function getFlow(id: string): Promise<Flow> {
  try {
    const flowTable = db.table<Flow>(config.FLOW_TABLE);
    const flow = await flowTable.findOne({ flow_id: id });
    if (!flow) {
      throw new Error("Flow not found");
    }
    flow.flow_id = flow.flow_id.toString();
    return flow as Flow;
  } catch (err) {
    console.error("Error fetching flow:", err);
    throw err;
  }
}


export async function createFlow(flow: Flow): Promise<string> {
  if (!flow.flow_id) {
    flow.flow_id = uuidv4().toString();
  }
  const db = await getDb();
  const flowTable = db.table<Flow>(config.FLOW_TABLE);
  flow.created_at = new Date().toISOString();
  console.log("flow to save", flow);
  const newFlow = await flowTable.insertOne(flow);
  return newFlow.insertedId as string;
}

export async function updateFlow(flow: Omit<Flow, 'flow_id'> & { flow_id: string }): Promise<string> {
  const db = await getDb();
  const flowTable = db.table(config.FLOW_TABLE);
  const { flow_id, created_at, ...flowToUpdate } = flow;
  flowToUpdate.updated_at = new Date().toISOString();
  console.log(flowToUpdate, flow_id);
  const newFlow = await flowTable.updateOne({ flow_id: flow_id.toString() }, { $set: flowToUpdate });
  console.log(newFlow);
  return flow_id;
}
