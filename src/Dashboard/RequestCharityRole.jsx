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

  // Check for existing request
  useEffect(() => {
    axios.get(`/api/charity/check-status/${user?.email}`).then(res => {
      if (res.data.exists) {
        toast.error("You already have a pending/approved request.");
      }
    });
  }, [user]);

  // Create payment intent
  useEffect(() => {
    axios.post("http://localhost:5000/api/charity/create-payment-intent", { amount }).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError || paymentIntent.status !== "succeeded") {
      toast.error("Payment failed");
      setLoading(false);
      return;
    }

    // Save to DB
    const roleRequest = {
      name: user.displayName,
      email: user.email,
      organization: data.organization,
      mission: data.mission,
      transactionId: paymentIntent.id,
      amount: amount,
    };

    axios.post("/api/charity/submit-role-request", roleRequest).then(() => {
      toast.success("Request submitted successfully");
      reset();
    }).catch(() => {
      toast.error("Submission failed");
    }).finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <input readOnly value={user?.displayName} className="input input-bordered w-full" />
      <input readOnly value={user?.email} className="input input-bordered w-full" />
      <input {...register("organization", { required: true })} placeholder="Organization Name" className="input input-bordered w-full" />
      <textarea {...register("mission", { required: true })} placeholder="Mission Statement" className="textarea textarea-bordered w-full" />
      <div className="p-4 border rounded">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe || loading} className="btn btn-primary w-full">
        Pay ${amount}
      </button>
    </form>
  );
};

export default RequestCharityRole;
