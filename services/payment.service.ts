import payInfos from "../models/payInfos";
import { SERVER_URL, STRIPE_ENDPOINT } from "./constants";

class PaymentService {
  async Pay(payInfos: payInfos): Promise<string> {
    const res = await fetch(`${SERVER_URL}${STRIPE_ENDPOINT}`, {
      method: "POST",
      //credentials: "include",
      body: JSON.stringify({ payInfos }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const { client_secret: clientSecret } = data;

    return clientSecret as string;
  }
}

const paymentService = new PaymentService();

export default paymentService;
