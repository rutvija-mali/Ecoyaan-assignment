"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";

export default function PaymentPage() {
    const router = useRouter();
    const {
        cartItems,
        shippingFee,
        discount,
        subtotal,
        grandTotal,
        shippingAddress,
        orderPlaced,
        placeOrder,
        resetOrder,
    } = useCheckout();

    const [processing, setProcessing] = useState(false);

    // Redirect if no data
    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 text-center pt-2">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-w-md mx-auto mt-4">
                    <p className="text-gray-600 mb-3">No order in progress.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-5 rounded-xl transition-colors cursor-pointer text-sm"
                    >
                        ← Go to Cart
                    </button>
                </div>
            </div>
        );
    }

    // Order Success State
    if (orderPlaced) {
        return (

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pb-8 pt-2">
                <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                        Order Successful!
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base mb-1">
                        Thank you for your purchase, {shippingAddress?.fullName}!
                    </p>
                    <p className="text-gray-400 text-xs mb-5">
                        A confirmation email has been sent to {shippingAddress?.email}
                    </p>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left mb-5">
                        <h3 className="font-semibold text-gray-800 mb-3">Order Details</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            {cartItems.map((item) => (
                                <div key={item.product_id} className="flex justify-between">
                                    <span>{item.product_name} × {item.quantity}</span>
                                    <span className="font-medium text-gray-800">
                                        ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                            <hr className="border-gray-100 my-2" />
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>Total Paid</span>
                                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => { resetOrder(); router.push("/"); }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors cursor-pointer text-sm"
                    >
                        Continue Shopping 🌿
                    </button>
                </div>
            </div>
        );
    }

    const handlePayment = async () => {
        setProcessing(true);
        // Simulate payment processing
        await new Promise((res) => setTimeout(res, 1500));
        placeOrder();
        setProcessing(false);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10 pt-2">
            <StepIndicator currentStep={3} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 mt-4">
                {/* Left: Order Items + Address */}
                <div className="space-y-4">
                    {/* Items */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Items ({cartItems.length})
                        </h3>
                        <div className="space-y-3">
                            {cartItems.map((item) => (
                                <div key={item.product_id} className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                        <Image src={item.image} alt={item.product_name} fill className="object-cover" sizes="48px" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{item.product_name}</p>
                                        <p className="text-xs text-gray-500">₹{item.product_price.toLocaleString("en-IN")} × {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-emerald-700">
                                        ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base font-semibold text-gray-800">Delivering To</h3>
                            <button onClick={() => router.push("/shipping")} className="text-emerald-600 text-sm font-medium hover:underline cursor-pointer">
                                Edit
                            </button>
                        </div>
                        {shippingAddress && (
                            <div className="text-sm text-gray-600 space-y-0.5">
                                <p className="font-medium text-gray-800">{shippingAddress.fullName}</p>
                                <p>{shippingAddress.email}</p>
                                <p>{shippingAddress.phone}</p>
                                <p>{shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Summary + Pay */}
                <div className="space-y-4">
                    <OrderSummary subtotal={subtotal} shippingFee={shippingFee} discount={discount} grandTotal={grandTotal} />

                    <button
                        onClick={handlePayment}
                        disabled={processing}
                        className={`w-full font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-sm shadow-sm cursor-pointer ${processing ? "bg-gray-400 text-white cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md"}`}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            "🔒 Pay Securely — ₹" + grandTotal.toLocaleString("en-IN")
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/shipping")}
                        className="w-full py-2.5 px-5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                    >
                        ← Back to Shipping
                    </button>
                </div>
            </div>
        </div>
    );
}
