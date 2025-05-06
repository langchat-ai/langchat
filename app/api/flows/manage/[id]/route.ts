import { NextResponse } from "next/server";
import { getFlow } from "@/app/lib/db/flowManageOperation";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("GET request received for flow ID:", params.id);
  const flow = await getFlow(params.id);

  if (!flow) {
    return NextResponse.json({ error: "Flow not found" }, { status: 404 });
  }

  return NextResponse.json(flow);
}
