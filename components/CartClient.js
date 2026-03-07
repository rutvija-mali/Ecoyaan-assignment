"use client";

import { useCheckout } from "@/context/CheckoutContext";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartClient({ serverData }) {
    const router = useRouter();
    const {
        cartItems,
        shippingFee,
        discount,
        subtotal,
        grandTotal,
        initializeCart,
        hydrated,
    } = useCheckout();

    // Initialize context with server-fetched data
    useEffect(() => {
        if (hydrated && serverData) {
            initializeCart(serverData);
        }
    }, [hydrated, serverData]);

    // Use context data if available, otherwise fall back to server data
    const items = cartItems.length > 0 ? cartItems : serverData.cartItems;
    const fee = shippingFee || serverData.shipping_fee;
    const disc = discount || serverData.discount_applied;
    const sub = cartItems.length > 0 ? subtotal : items.reduce((s, i) => s + i.product_price * i.quantity, 0);
    const total = cartItems.length > 0 ? grandTotal : sub + fee - disc;

    return (
        <div className="w-full space-y-6">
            <StepIndicator currentStep={1} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
                        </h2>
                        <div className="divide-y divide-gray-100 flex flex-col gap-4">
                            {items.map((item) => (
                                <CartItem key={item.product_id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 space-y-4">
                        <OrderSummary
                            subtotal={sub}
                            shippingFee={fee}
                            discount={disc}
                            grandTotal={total}
                        />
                        <button
                            onClick={() => router.push("/shipping")}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 cursor-pointer text-base shadow-sm hover:shadow-md"
                        >
                            Proceed to Checkout →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
