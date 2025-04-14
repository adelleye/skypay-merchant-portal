
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const PendingApproval = () => {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Clock className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Account Under Review</CardTitle>
          <CardDescription>
            Your merchant account is pending approval by our team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Our team reviews your application (typically within 1-2 business days)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>You'll receive an email notification once your account is approved</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>After approval, you can log in and start processing payments</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-md border p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Need assistance?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  If you have any questions about your application, please contact our support team at 
                  <a href="mailto:support@skypay.com" className="text-primary hover:underline ml-1">
                    support@skypay.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={logout}>
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PendingApproval;
