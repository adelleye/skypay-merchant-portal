
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type FormData = {
  businessName: string;
  contactName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  agreeTerms: boolean;
};

const MerchantSignup = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const password = watch("password", "");

  const onSubmit = async (data: FormData) => {
    if (!data.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      
      // Remove confirmPassword and agreeTerms from data before sending
      const { confirmPassword, agreeTerms, ...userData } = data;
      
      await registerUser(userData);
      
      toast({
        title: "Registration Successful",
        description: "Your account is pending approval. You'll be notified once approved.",
      });
      
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">SP</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create Merchant Account</CardTitle>
          <CardDescription className="text-center">
            Enter your business information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="form-group">
                <Label htmlFor="businessName">Business Name</Label>
                <Input 
                  id="businessName"
                  {...register("businessName", { required: "Business name is required" })}
                  placeholder="Your Business Name"
                  className={errors.businessName ? "border-red-500" : ""}
                />
                {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName.message}</p>}
              </div>

              <div className="form-group">
                <Label htmlFor="contactName">Contact Person Name</Label>
                <Input 
                  id="contactName"
                  {...register("contactName", { required: "Contact name is required" })}
                  placeholder="Full Name"
                  className={errors.contactName ? "border-red-500" : ""}
                />
                {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName.message}</p>}
              </div>

              <div className="form-group">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="your@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    placeholder="••••••••"
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="form-group">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", { 
                      required: "Please confirm your password",
                      validate: value => value === password || "Passwords do not match"
                    })}
                    placeholder="••••••••"
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber"
                  {...register("phoneNumber", { required: "Phone number is required" })}
                  placeholder="(123) 456-7890"
                  className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
              </div>

              <div className="form-group">
                <Label htmlFor="address">Business Address</Label>
                <Input 
                  id="address"
                  {...register("address", { required: "Business address is required" })}
                  placeholder="123 Main St, City, Country"
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="agreeTerms" 
                  {...register("agreeTerms")}
                />
                <Label htmlFor="agreeTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </Label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MerchantSignup;
