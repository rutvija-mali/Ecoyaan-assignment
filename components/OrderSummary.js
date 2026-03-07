export default function OrderSummary({ subtotal, shippingFee, discount, grandTotal }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Order Summary</h3>

            <div className="space-y-2 text-sm">
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

                <div className="flex justify-between items-center font-bold text-gray-900 pt-0.5">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
            </div>
        </div>
    );
}