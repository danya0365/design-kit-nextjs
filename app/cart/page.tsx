import { CartView } from "@/src/presentation/components/cart/CartView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | Design Kit",
  description: "Review and checkout your cart items.",
};

export default function CartPage() {
  return <CartView />;
}
