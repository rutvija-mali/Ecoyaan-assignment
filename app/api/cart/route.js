import { NextResponse } from "next/server";
import { getCart } from "@/lib/cart";

export async function GET() {
  const data = await getCart();
  return NextResponse.json(data);
}
