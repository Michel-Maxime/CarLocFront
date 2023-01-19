import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";

function Payment() {
  // todo : do an object
  const car = {
    id: "8ee20657-5d49-4d0d-a022-2cd0887052b1",
    ownerId: "1b0e683a-a252-4426-97c1-b0d8157b1999",
    price: 15,
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    //TODO : if no cars => return
    if (paymentStatus !== "succeeded") return;

    //TODO : passer la voiture en isAvaible => false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // TODO : voir a quoi ce sert

    if (!stripe || !elements) return;

    const cardEl = elements.getElement(CardElement);

    setIsProcessing(true);

    try {
      const res = await fetch("http://localhost:5000/stripe", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ car }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      const { client_secret: clientSecret } = data;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl!,
        },
      });

      if (!paymentIntent) {
        setPaymentStatus("Payment failed!");
      } else {
        setPaymentStatus(paymentIntent.status);
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus("Payment failed!");
    }

    setIsProcessing(false);
  };

  return (
    <div style={{ fontSize: "20px" }}>
      <form onSubmit={handleSubmit} id="payment-form">
        <label htmlFor="card-element">Place order</label>
        <CardElement id="card-element" />
        {!isProcessing && <button style={{}}>Pay</button>}
        {isProcessing && <div>Processing...</div>}
        {isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
      </form>
    </div>
  );
}

const PaymentGateway = () => {
  const stripePromise = loadStripe(
    "pk_test_51MRuNeEcMIwCpU5crLRA92TARZ8aCzr6lhaMe0qWOttPZOxPIziNo9QgMcVuK8jlCzgeINrUmXy89uhiUk6KewBh00f1YsoI7K"
  );

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default PaymentGateway;
