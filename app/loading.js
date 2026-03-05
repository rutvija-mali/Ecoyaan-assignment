export default function Loading() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
                {/* Header skeleton */}
                <div className="text-center mb-10">
                    <div className="h-10 w-48 bg-gray-200 rounded-lg mx-auto animate-pulse" />
                    <div className="h-4 w-64 bg-gray-100 rounded mx-auto mt-3 animate-pulse" />
                </div>

                {/* Step indicator skeleton */}
                <div className="flex items-center justify-center gap-5 mb-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                            {i < 3 && <div className="w-16 h-0.5 bg-gray-200" />}
                        </div>
                    ))}
                </div>

                {/* Cart items skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-9">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                            >
                                <div className="w-24 h-24 rounded-lg bg-gray-200 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                                </div>
                                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* Summary skeleton */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex justify-between">
                                    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                                    <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
