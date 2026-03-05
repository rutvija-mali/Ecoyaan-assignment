export default function OrderSummary({ subtotal, shippingFee, discount, grandTotal }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm  sm:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h3>

            <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                    <span>Shipping</span>
                    <span>₹{shippingFee.toLocaleString("en-IN")}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                )}

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-1">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
            </div>
        </div>
    );
}
