// Importing loadStripe from the stripe-js library
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Declaring stripePromise with a type of Stripe | null, initially null
let stripePromise: Promise<Stripe | null> | null = null;

// getStripe function to initialize or return the existing stripePromise
const getStripe = () => {
  // Check if stripePromise is falsy
  if (!stripePromise) {
    // Initialize stripePromise with the loadStripe function and your Stripe publishable key from environment variables
    stripePromise = loadStripe(import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');
  }
  // Return the existing or newly created stripePromise
  return stripePromise;
};

// Exporting getStripe for use in other parts of your application
export default getStripe;
