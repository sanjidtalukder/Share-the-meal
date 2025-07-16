import React, { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";


const DonationModal = ({ charity, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(10); 

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      
      const { data } = await axios.post(
        "http://localhost:5000/api/donations/create-payment-intent",
        {
          amount: amount * 100, 
          charityId: charity._id,
          userEmail: user?.email,
        }
      );

      const clientSecret = data.clientSecret;
      const card = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
        setLoading(false);
        return;
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        
        await axios.post("http://localhost:5000/api/donations/save", {
          userEmail: user?.email,
          charityId: charity._id,
          amount,
          transactionId: paymentResult.paymentIntent.id,
        });

        toast.success("Donation successful! Thank you for your support.");
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Donation failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      id="donation-modal-backdrop"
      onClick={(e) => {
        if (e.target.id === "donation-modal-backdrop") onClose();
      }}
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h3 className="text-2xl font-semibold mb-4 text-center">
          Donate to {charity.name}
        </h3>

        <form onSubmit={handleDonate} className="space-y-4">
          <label className="block font-semibold">
            Donation Amount (USD)
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input input-bordered w-full mt-1"
              required
            />
          </label>

          <div className="p-4 border rounded">
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>

          <button
            type="submit"
            disabled={!stripe || loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Processing..." : `Donate $${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;
