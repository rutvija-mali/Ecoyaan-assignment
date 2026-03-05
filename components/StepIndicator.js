const steps = ["Cart", "Shipping", "Payment"];

export default function StepIndicator({ currentStep }) {
    return (
        <div className="flex items-center justify-center gap-0 sm:gap-3 mb-10">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                    <div key={step} className="flex items-center">
                        {/* Step circle + label */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isCompleted
                                        ? "bg-emerald-600 text-white"
                                        : isActive
                                            ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    stepNumber
                                )}
                            </div>
                            <span
                                className={`mt-1.5 text-xs sm:text-sm font-medium ${isActive || isCompleted ? "text-emerald-700" : "text-gray-400"
                                    }`}
                            >
                                {step}
                            </span>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`w-12 sm:w-20 h-0.5 mx-1 sm:mx-2 mb-5 transition-colors duration-300 ${isCompleted ? "bg-emerald-500" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
