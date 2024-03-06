import getStripe from "./getStripe";
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Define the Home component as a functional component
const Home: React.FC = () => {
  const handleCheckout = async () => {
    const stripe = await getStripe();
    if (!stripe) {
      console.error('Stripe is not initialized');
      return;
    }
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: import.meta.env.NEXT_PUBLIC_STRIPE_PRICE_ID, // Fallback to an empty string if the environment variable is not set
        quantity: 1,
      }],
      mode: 'subscription',
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: 'customer@email.com', // Normally, you'd want to dynamically set or obtain this email
    });

    // If there is an error, log it to the console
    if (error) console.warn(error.message);
  };

  // Render the button that triggers handleCheckout when clicked
  return <button onClick={handleCheckout}>Checkout</button>;
};

export default Home;
