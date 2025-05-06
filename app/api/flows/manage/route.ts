import { NextResponse } from "next/server";
import { getFlows, createFlow, updateFlow } from "@/app/lib/db/flowManageOperation";

export async function GET(request: Request) {
  const flows = await getFlows();
  console.log(flows)
  return NextResponse.json(flows);
}

export async function POST(request: Request) {
  const flow = await request.json();
  if (flow.flowId) {
    const newFlow = await updateFlow(flow);
    return NextResponse.json(newFlow);
  } else {
    const newFlow = await createFlow(flow);
    return NextResponse.json(newFlow);
  }
}