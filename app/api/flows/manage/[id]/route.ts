import { NextResponse } from "next/server";
import { getFlow } from "@/app/lib/db/flowManageOperation";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = (await context).params;
  const flow = await getFlow(id);

  if (!flow) {
    return NextResponse.json({ error: "Flow not found" }, { status: 404 });
  }

  return NextResponse.json(flow);
}
