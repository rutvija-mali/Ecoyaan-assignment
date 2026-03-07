"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";

const initialFormState = {
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
};

const validators = {
    fullName: (v) => (v.trim().length >= 2 ? "" : "Full name is required"),
    email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
    phone: (v) =>
        /^\d{10}$/.test(v) ? "" : "Phone number must be exactly 10 digits",
    pinCode: (v) =>
        /^\d{6}$/.test(v) ? "" : "PIN code must be exactly 6 digits",
    city: (v) => (v.trim().length >= 2 ? "" : "City is required"),
    state: (v) => (v.trim().length >= 2 ? "" : "State is required"),
};

const fieldMeta = [
    { name: "fullName", label: "Full Name", type: "text", placeholder: "e.g. Priya Sharma", colSpan: "sm:col-span-2" },
    { name: "email", label: "Email Address", type: "email", placeholder: "e.g. priya@example.com", colSpan: "sm:col-span-1" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "e.g. 9876543210", colSpan: "sm:col-span-1" },
    { name: "pinCode", label: "PIN Code", type: "text", placeholder: "e.g. 560001", colSpan: "sm:col-span-1" },
    { name: "city", label: "City", type: "text", placeholder: "e.g. Bangalore", colSpan: "sm:col-span-1" },
    { name: "state", label: "State", type: "text", placeholder: "e.g. Karnataka", colSpan: "sm:col-span-2" },
];

export default function ShippingPage() {
    const router = useRouter();
    const {
        cartItems,
        updateShippingAddress,
        shippingAddress,
        savedAddresses,
        addAddress,
        hydrated
    } = useCheckout();

    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showForm, setShowForm] = useState(false);

    // Wait for hydration
    if (!hydrated) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 text-center pt-20">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
                </div>
            </div>
        );
    }

    // Redirect to cart if no items
    if (cartItems.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 text-center pt-2">
                <StepIndicator currentStep={2} />
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-w-md mx-auto mt-4">
                    <p className="text-gray-600 mb-3">Your cart is empty. Add items to proceed.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-5 rounded-xl transition-colors cursor-pointer text-sm"
                    >
                        ← Back to Cart
                    </button>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Validate on change if field was touched
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        let hasError = false;
        for (const field of fieldMeta) {
            const error = validators[field.name](form[field.name]);
            if (error) {
                newErrors[field.name] = error;
                hasError = true;
            }
        }

        setErrors(newErrors);
        setTouched(
            fieldMeta.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})
        );

        if (hasError) return;

        // Save to context and navigate if this was a new address
        const newAddress = addAddress(form);
        updateShippingAddress(newAddress);
        router.push("/payment");
    };

    const handleSelectAddress = (address) => {
        updateShippingAddress(address);
        router.push("/payment");
    };

    const isInitialForm = savedAddresses.length === 0;
    const shouldShowForm = isInitialForm || showForm;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10 pt-2">
            <StepIndicator currentStep={2} />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mt-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Shipping Address
                    </h2>
                    {!isInitialForm && !shouldShowForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="text-sm text-emerald-600 font-semibold hover:text-emerald-700 hover:underline cursor-pointer"
                        >
                            + Add New Address
                        </button>
                    )}
                </div>

                {!shouldShowForm && savedAddresses.length > 0 && (
                    <div className="space-y-4 mb-6">
                        {savedAddresses.map((addr) => (
                            <div
                                key={addr.id}
                                className={`border rounded-xl p-4 cursor-pointer transition-all ${shippingAddress?.id === addr.id ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'}`}
                                onClick={() => handleSelectAddress(addr)}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="font-semibold text-gray-800 text-sm">{addr.fullName}</p>
                                        <p className="text-sm text-gray-600">{addr.phone}</p>
                                        <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pinCode}</p>
                                        <p className="text-sm text-gray-500">{addr.email}</p>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${shippingAddress?.id === addr.id ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'}`}>
                                            {shippingAddress?.id === addr.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {shouldShowForm && (
                    <form onSubmit={handleSubmit} noValidate className="animate-in fade-in slide-in-from-top-4 duration-300">
                        {!isInitialForm && (
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="mb-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
                            >
                                ✕ Cancel adding address
                            </button>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {fieldMeta.map((field) => (
                                <div key={field.name} className={field.colSpan}>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-xs font-medium text-gray-700 mb-1"
                                    >
                                        {field.label} <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={field.placeholder}
                                        className={`w-full px-3 py-2 rounded-lg border text-gray-800 text-sm transition-colors duration-200 outline-none focus:ring-2 ${errors[field.name] && touched[field.name]
                                            ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                                            : "border-gray-200 focus:ring-emerald-200 focus:border-emerald-400"
                                            }`}
                                    />
                                    {errors[field.name] && touched[field.name] && (
                                        <p className="mt-0.5 text-xs text-red-500">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => router.push("/")}
                                className="sm:flex-1 py-2.5 px-5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                            >
                                ← Back to Cart
                            </button>
                            <button
                                type="submit"
                                className="sm:flex-1 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors cursor-pointer text-sm shadow-sm hover:shadow-md"
                            >
                                Save & Continue →
                            </button>
                        </div>
                    </form>
                )}

                {!shouldShowForm && savedAddresses.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="sm:flex-1 py-2.5 px-5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                        >
                            ← Back to Cart
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/payment")}
                            disabled={!shippingAddress}
                            className={`sm:flex-1 py-2.5 px-5 rounded-xl font-semibold transition-colors cursor-pointer text-sm shadow-sm ${shippingAddress ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                            Continue to Payment →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
