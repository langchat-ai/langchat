import { NextResponse } from "next/server";
import { getFlowsforEditing } from "@/app/lib/db/flowQueries";

export async function GET(request: Request) {
  const flows = await getFlowsforEditing();
  console.log(flows);
  return NextResponse.json(flows);
}
