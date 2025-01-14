import { NextResponse } from "next/server";
import { getFlows } from "@/app/lib/db/flowQueries";

export async function GET(request: Request) {
  const flows = await getFlows();
  console.log(flows);
  return NextResponse.json(flows);
}
