export default function CheckoutHeader({ className = "text-center mb-8" }) {
    return (
        <div className={className}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                🌿 Ecoyaan
            </h1>
            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base font-medium">
                Sustainable shopping, one step at a time
            </p>
        </div>
    );
}
