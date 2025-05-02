import { NextResponse } from "next/server";
import { getFlows, createFlow, updateFlow } from "@/app/lib/db/flowModel";

export async function GET(request: Request) {
  const flows = await getFlows();
  console.log(flows)
  return NextResponse.json(flows);
}

export async function POST(request: Request) {
  const flow = await request.json();
  console.log("POST", flow)
  if (flow.flowId) {
    const newFlow = await updateFlow(flow);
    return NextResponse.json(newFlow);
  } else {
    const newFlow = await createFlow(flow);
    return NextResponse.json(newFlow);
  }
}