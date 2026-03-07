import CartClient from "@/components/CartClient";
import { getCart } from "@/lib/cart";

export default async function CartPage() {
  const data = await getCart();

  return (
    <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 flex flex-col justify-center items-center space-y-6 sm:space-y-10  ">
      {/* Content Area */}
      <div className="w-full">
        <CartClient serverData={data} />
      </div>
    </div>
  );
}