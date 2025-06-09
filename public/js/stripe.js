import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { showAlert } from './alerts';

let stripePromise = loadStripe(
  'pk_test_51RXjdqGgSE9KRhiqmmFSrHi8hilYgMvQHKDjXZ4XJNR7dGjJATRhwP2x0zANOYuVLq4IFbqZL1I388O7r9c1hLJQ00oqlt9eMI'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://localhost:3000/api/v1/booking/checkout-session/${tourId}`
    );
    console.log('session:', session);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
