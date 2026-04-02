const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

/** Payload from Razorpay Checkout handler after successful payment. */
export type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  handler: (res: RazorpayHandlerResponse) => void;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Load Razorpay script (once) and open Checkout with the given options.
 * Call verifyPayment in the handler with razorpay_order_id, razorpay_payment_id, razorpay_signature.
 */
export async function openRazorpayCheckout(
  options: RazorpayOptions
): Promise<void> {
  await loadScript(RAZORPAY_SCRIPT_URL);
  const Razorpay = window.Razorpay;
  if (!Razorpay) throw new Error("Razorpay failed to load");
  const rzp = new Razorpay(options);
  rzp.open();
}
