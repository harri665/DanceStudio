import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripeCheckoutComponentProps {
  amount: number; // Assuming amount is in cents for simplicity
  onSuccess: (paymentIntentId: string) => void; // Callback for successful payment
  onError: (error: Error) => void; // Callback for errors
}

const StripeCheckoutComponent: React.FC<StripeCheckoutComponentProps> = ({
  amount,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js hasn't loaded yet.");
      return;
    }

    try {
      // Replace '/create-payment-intent' with your actual payment intent creation endpoint
      const paymentIntentResponse = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const paymentIntentResult = await paymentIntentResponse.json();

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        console.error("CardElement wasn't found");
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(paymentIntentResult.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      });

      if (error) {
        console.error(error);
        onError(new Error(error.message));
      } else if (paymentIntent) {
        console.log('Payment successful:', paymentIntent);
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      console.error(err);
      onError(new Error('Payment failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-10 bg-white/30 backdrop-blur-md rounded-lg border border-gray-200 shadow-lg w-[50%]">
        <div className="mb-6">
          <CardElement className="p-4 bg-white/60 rounded-md shadow-sm border border-gray-300"/>
        </div>
        <button type="submit" disabled={!stripe} className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 ease-in-out">
          Pay ${amount / 100}
        </button>
      </form>
    </div>
  );
};

export default StripeCheckoutComponent;
