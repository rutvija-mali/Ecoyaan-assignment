import CartClient from "@/components/CartClient";

async function getCartData() {
  // Fetch from our own API route — this runs on the server during SSR
  const res = await fetch("http://localhost:3000/api/cart", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart data");
  }

  return res.json();
}

export default async function CartPage() {
  const data = await getCartData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            🌿 Ecoyaan
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Sustainable shopping, one step at a time
          </p>
        </div>

        <CartClient serverData={data} />
      </div>
    </main>
  );
}
