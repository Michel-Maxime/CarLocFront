import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import paymentService from "../services/payment.service";
import payInfos from "../models/payInfos";

function Payment(props: payInfos) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const { carId, ownerId } = props;

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
      const clientSecret: string = await paymentService.Pay({
        carId,
        ownerId,
      });

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
        {/* <PaymentElement /> */}
        {!isProcessing && <button style={{}}>Pay</button>}
        {isProcessing && <div>Processing...</div>}
        {isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
      </form>
    </div>
  );
}

const PaymentGateway = (props: payInfos) => {
  const stripePromise = loadStripe(
    "pk_test_51MRuNeEcMIwCpU5crLRA92TARZ8aCzr6lhaMe0qWOttPZOxPIziNo9QgMcVuK8jlCzgeINrUmXy89uhiUk6KewBh00f1YsoI7K"
  );

  return (
    <Elements
      stripe={stripePromise}
      options={{ appearance: { theme: "flat" } }}
    >
      <Payment carId={props.carId} ownerId={props.ownerId} />
    </Elements>
  );
};

export default PaymentGateway;
