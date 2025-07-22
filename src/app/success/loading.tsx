export default function Loading() {
  // This component is displayed while the payment data is being fetched
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Loading...
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Please wait while we retrieve your payment details.
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
