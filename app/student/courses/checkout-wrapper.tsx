import { ClientSuspenseWrapper } from "./wrapper";
import CheckoutPageContent from "../courses/checkout/page";
import { Spinner } from "@/components/ui/spinner";

export const dynamic = "force-dynamic"; 

export default function CheckoutPage() {
  return (
    <ClientSuspenseWrapper fallback={<Spinner />}>
      <CheckoutPageContent />
    </ClientSuspenseWrapper>
  );
}
