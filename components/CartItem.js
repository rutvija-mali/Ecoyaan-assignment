import Image from "next/image";

export default function CartItem({ item }) {
    const lineTotal = item.product_price * item.quantity;

    return (
        <div className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Product Image */}
            <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                <Image
                    src={item.image}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                    sizes="64px"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 space-y-0.5">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                    {item.product_name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                    ₹{item.product_price.toLocaleString("en-IN")} × {item.quantity}
                </p>
            </div>

            {/* Line Total */}
            <div className="text-right flex-shrink-0 pl-2">
                <p className="text-base sm:text-lg font-bold text-emerald-600">
                    ₹{lineTotal.toLocaleString("en-IN")}
                </p>
            </div>
        </div>
    );
}