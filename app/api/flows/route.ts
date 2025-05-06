import { NextResponse } from "next/server";
import { getFlows } from "@/app/lib/db/flowOperation";

export async function GET(request: Request) {
  const flows = await getFlows();
  console.log(flows);
  return NextResponse.json(flows);
}
