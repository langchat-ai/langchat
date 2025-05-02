import { NextResponse } from "next/server";
import { getFlows, createFlow } from "@/app/lib/db/flowModel";

export async function GET(request: Request) {
  const flows = await getFlows();
  return NextResponse.json(flows);
}

export async function POST(request: Request) {
  const flow = await request.json();
  const newFlow = await createFlow(flow);
  return NextResponse.json(newFlow);
}