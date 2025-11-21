"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { coursesCatalog } from "@/components/data/courses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

// ✅ Server Component with searchParams
export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  const idsParam = searchParams?.ids || "";
  const selectedIds = idsParam
    .split(",")
    .map((x) => Number.parseInt(x, 10))
    .filter((n) => !Number.isNaN(n));

  const selectedCourses = coursesCatalog.filter((c) =>
    selectedIds.includes(c.id)
  );

  const subtotal = selectedCourses.reduce((sum, c) => sum + c.price, 0);

  return (
    <CheckoutClient selectedCourses={selectedCourses} subtotal={subtotal} />
  );
}

// ✅ Client component for form logic
function CheckoutClient({
  selectedCourses,
  subtotal,
}: {
  selectedCourses: typeof coursesCatalog;
  subtotal: number;
}) {
  "use client";

  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");

  const onPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourses.length) {
      toast({
        title: "No courses selected",
        description: "Please go back and select courses before checking out.",
        variant: "destructive",
      });
      return;
    }
    if (!name || !email || !cardNumber || !expiry || !cvc) {
      toast({
        title: "Missing details",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment successful (demo)",
      description: `Enrolled in ${selectedCourses.length} course${
        selectedCourses.length > 1 ? "s" : ""
      }. Total charged: RS. ${subtotal}.`,
    });

    setTimeout(() => router.push("/dashboard"), 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Checkout
          </h1>
          <p className="text-muted-foreground">
            Enter your card details to complete your course registration.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payment Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Card details</CardTitle>
            <CardDescription>
              All transactions are processed securely. This is a demo form—no
              real charge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={onPay}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Cardholder name</Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="number">Card number</Label>
                <Input
                  id="number"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                  <Input
                    id="expiry"
                    placeholder="12/28"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    inputMode="numeric"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP / Postal code</Label>
                  <Input
                    id="zip"
                    placeholder="10001"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>

              <Separator className="my-2" />

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  By clicking Pay, you agree to the CIET School LMS terms.
                </div>
                <Button type="submit">Pay RS. {subtotal}</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>Review your selected courses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedCourses.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No courses selected.
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {selectedCourses.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-start justify-between"
                    >
                      <div>
                        <div className="font-medium">{c.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {c.level} • {c.durationWeeks} weeks
                        </div>
                      </div>
                      <Badge variant="secondary">RS. {c.price}</Badge>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Subtotal</div>
                  <div className="font-medium">RS. {subtotal}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Processing
                  </div>
                  <div className="font-medium">RS. 0</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="text-sm">Total</div>
                  <div className="text-lg font-semibold">RS. {subtotal}</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
