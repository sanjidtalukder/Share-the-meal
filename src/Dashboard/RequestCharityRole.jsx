import { useForm } from "react-hook-form";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const RequestCharityRole = () => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const { register, handleSubmit, reset } = useForm();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = 25; // USD
  const BASE_URL = "https://share-the-meal-server-blond.vercel.app"; // backend API base

  // Check for existing request
  useEffect(() => {
    if (user?.email) {
      axios.get(`${BASE_URL}/api/role-request/check-status/${user.email}`)
        .then(res => {
          if (res.data.exists) {
            toast.error("You already have a pending/approved request.");
          }
        })
        .catch(() => toast.error("Failed to check request status"));
    }
  }, [user]);

  // Create payment intent
  useEffect(() => {
    if (user?.email) {
      axios
        .post(`${BASE_URL}/api/role-request/create-payment-intent`, {
          amount,
          email: user.email,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          toast.error("Failed to initialize payment");
          console.error("Payment intent error:", err);
        });
    }
  }, [user?.email]);

  const onSubmit = async (data) => {
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card information is missing");
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "unknown@example.com"
        }
      }
    });

    if (confirmError || paymentIntent?.status !== "succeeded") {
      toast.error("Payment failed");
      setLoading(false);
      return;
    }

    // Save role request to DB
    const roleRequest = {
      name: user.displayName,
      email: user.email,
      organization: data.organization,
      mission: data.mission,
      transactionId: paymentIntent.id,
      amount,
    };

    axios.post(`${BASE_URL}/api/role-request/submit`, roleRequest)
      .then(() => {
        toast.success("Request submitted successfully");
        reset();
      })
      .catch(() => {
        toast.error("Submission failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <input readOnly value={user?.displayName} className="input input-bordered w-full" />
      <input readOnly value={user?.email} className="input input-bordered w-full" />
      <input {...register("organization", { required: true })} placeholder="Organization Name" className="input input-bordered w-full" />
      <textarea {...register("mission", { required: true })} placeholder="Mission Statement" className="textarea textarea-bordered w-full" />
      <div className="p-4 border rounded">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button type="submit" disabled={!stripe || loading} className="btn btn-primary w-full">
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default RequestCharityRole;
