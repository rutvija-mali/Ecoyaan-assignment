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
    const { cartItems, updateShippingAddress, shippingAddress } = useCheckout();
    const [form, setForm] = useState(shippingAddress || initialFormState);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Redirect to cart if no items
    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            🌿 Ecoyaan
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm sm:text-base">
                            Sustainable shopping, one step at a time
                        </p>
                    </div>
                    <StepIndicator currentStep={2} />
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 max-w-md mx-auto">
                        <p className="text-gray-600 mb-4">Your cart is empty. Add items to proceed.</p>
                        <button
                            onClick={() => router.push("/")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
                        >
                            ← Back to Cart
                        </button>
                    </div>
                </div>
            </main>
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

        // Save to context and navigate
        updateShippingAddress(form);
        router.push("/payment");
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        🌿 Ecoyaan
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        Sustainable shopping, one step at a time
                    </p>
                </div>

                <StepIndicator currentStep={2} />

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9 mt-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                        Shipping Address
                    </h2>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                            {fieldMeta.map((field) => (
                                <div key={field.name} className={field.colSpan}>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
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
                                        className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 text-sm transition-colors duration-200 outline-none focus:ring-2 ${errors[field.name] && touched[field.name]
                                                ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                                                : "border-gray-200 focus:ring-emerald-200 focus:border-emerald-400"
                                            }`}
                                    />
                                    {errors[field.name] && touched[field.name] && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <button
                                type="button"
                                onClick={() => router.push("/")}
                                className="sm:flex-1 py-3.5 px-7 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                            >
                                ← Back to Cart
                            </button>
                            <button
                                type="submit"
                                className="sm:flex-1 py-3.5 px-7 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors cursor-pointer text-sm shadow-sm hover:shadow-md"
                            >
                                Continue to Payment →
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
