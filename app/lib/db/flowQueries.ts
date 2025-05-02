import { getDb } from "./astradb";
import { ChatMessage, Flow } from "../definitions";
const db = await getDb();

export async function getFlows(): Promise<Flow[]> {
  try {
    const flowTable = db.table<Flow>("langchat_flows");
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



export async function getFlowsforEditing(): Promise<Flow[]> {
  try {
    const flowTable = db.table<Flow>("langchat_flows");
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
    const flowTable = db.table("langchat_flows");
    const flow = await flowTable.findOne({ flow_id: id });
    return flow as Flow;
  } catch (err) {
    console.error("Error fetching flow:", err);
    throw err;
  }
}