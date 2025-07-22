"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SuccessCheckoutPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [data, setData] = useState<{
    paymentIntentId?: string;
    subscriptionId?: string;
    customerEmail?: string;
    amountTotal?: number;
  } | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/get-payment-event?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch(console.error);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-700 text-center mb-6">
          Thank you for your purchase! Your payment has been processed
          successfully.
        </p>

        {data && (
          <>
            <p className="text-gray-700 text-center mb-2">
              <strong>Customer:</strong> {data.customerEmail}
            </p>

            {data.paymentIntentId && (
              <p className="text-gray-700 text-center mb-2">
                <strong>PaymentIntent ID:</strong>{" "}
                <code>{data.paymentIntentId}</code>
              </p>
            )}

            {data.subscriptionId && (
              <p className="text-gray-700 text-center mb-2">
                <strong>Subscription ID:</strong>{" "}
                <code>{data.subscriptionId}</code>
              </p>
            )}

            {data.amountTotal && (
              <p className="text-gray-700 text-center mb-2">
                <strong>Amount Paid:</strong> $
                {(data.amountTotal / 100).toFixed(2)}
              </p>
            )}
          </>
        )}

        <div className="text-center mt-6">
          <a
            href="/create"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
        <p className="text-sm text-gray-500 text-center mt-4">
          If you have any questions, please contact our support team.
        </p>
        <p className="text-sm text-gray-500 text-center mt-4 break-words">
          Session ID: <strong className="font-mono">{sessionId}</strong>
        </p>
      </div>
    </div>
  );
}
