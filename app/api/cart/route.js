import { NextResponse } from "next/server";

export async function GET() {
  // Simulate network delay to demonstrate loading.js
  await new Promise((res) => setTimeout(res, 500));

  const data = {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "/images/bamboo-toothbrush.webp",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "/images/cotton-produce-bags.webp",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };

  return NextResponse.json(data);
}
