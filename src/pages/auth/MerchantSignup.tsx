
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  phoneNumber: string;
  isRegisteredWithCAC: string;
  ownerFirstName: string;
  ownerLastName: string;
  bvn: string;
  // Non-registered business fields
  idType?: string;
  idNumber?: string;
  idDocument?: FileList;
  personalBankAccount?: string;
  personalBankName?: string;
  // Registered business fields
  cacNumber?: string;
  directorName?: string;
  directorBVN?: string;
  businessBankAccount?: string;
  businessBankName?: string;
  // Agreement
  agreeTerms: boolean;
};

const MerchantSignup = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm<FormData>();
  const password = watch("password", "");
  const isRegisteredWithCAC = watch("isRegisteredWithCAC", "no");

  const onSubmit = async (data: FormData) => {
    if (!data.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      // In a real application, you would handle file upload here
      // and process different data based on CAC registration status
      
      // Remove confirmPassword and agreeTerms from data before sending
      const { confirmPassword, agreeTerms, idDocument, ...userData } = data;
      
      // In a real implementation, you would process the file upload
      // and add the URL to userData
      
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
      <Card className="w-full max-w-2xl animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-[#FF4E00] flex items-center justify-center">
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account Credentials */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Credentials</h3>
              <div className="grid grid-cols-1 gap-4">
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
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Business Information</h3>
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
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber"
                    {...register("phoneNumber", { required: "Phone number is required" })}
                    placeholder="e.g., +234 800 123 4567"
                    className={errors.phoneNumber ? "border-red-500" : ""}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>

                <div className="form-group">
                  <Label>Is your business registered with CAC?</Label>
                  <Controller
                    control={control}
                    name="isRegisteredWithCAC"
                    defaultValue="no"
                    rules={{ required: "Please select an option" }}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="cac-yes" />
                          <Label htmlFor="cac-yes" className="cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="cac-no" />
                          <Label htmlFor="cac-no" className="cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.isRegisteredWithCAC && 
                    <p className="text-red-500 text-sm">{errors.isRegisteredWithCAC.message}</p>}
                </div>
              </div>
            </div>

            {/* Owner/Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Owner/Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <Label htmlFor="ownerFirstName">Owner/Contact Person First Name</Label>
                  <Input 
                    id="ownerFirstName"
                    {...register("ownerFirstName", { required: "Owner first name is required" })}
                    placeholder="First Name"
                    className={errors.ownerFirstName ? "border-red-500" : ""}
                  />
                  {errors.ownerFirstName && 
                    <p className="text-red-500 text-sm">{errors.ownerFirstName.message}</p>}
                </div>

                <div className="form-group">
                  <Label htmlFor="ownerLastName">Owner/Contact Person Last Name</Label>
                  <Input 
                    id="ownerLastName"
                    {...register("ownerLastName", { required: "Owner last name is required" })}
                    placeholder="Last Name"
                    className={errors.ownerLastName ? "border-red-500" : ""}
                  />
                  {errors.ownerLastName && 
                    <p className="text-red-500 text-sm">{errors.ownerLastName.message}</p>}
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
                <Input 
                  id="bvn"
                  {...register("bvn", { 
                    required: "BVN is required",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "BVN must be 11 digits"
                    }
                  })}
                  placeholder="Your 11-digit BVN"
                  className={errors.bvn ? "border-red-500" : ""}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will be used for identity validation via NIBSS iGree consent flow.
                </p>
                {errors.bvn && <p className="text-red-500 text-sm">{errors.bvn.message}</p>}
              </div>
            </div>

            {/* Conditional Fields Based on CAC Registration */}
            {isRegisteredWithCAC === "no" ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Individual/Starter Business Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group">
                    <Label htmlFor="idType">Government Issued ID Type</Label>
                    <Controller
                      control={control}
                      name="idType"
                      rules={{ required: "ID type is required" }}
                      render={({ field }) => (
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger className={errors.idType ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select ID Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nin">NIN</SelectItem>
                            <SelectItem value="voter">Voter's Card</SelectItem>
                            <SelectItem value="driver">Driver's License</SelectItem>
                            <SelectItem value="passport">International Passport</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.idType && <p className="text-red-500 text-sm">{errors.idType.message}</p>}
                  </div>

                  <div className="form-group">
                    <Label htmlFor="idNumber">Government Issued ID Number</Label>
                    <Input 
                      id="idNumber"
                      {...register("idNumber", { 
                        required: "ID number is required" 
                      })}
                      placeholder="Enter your ID number"
                      className={errors.idNumber ? "border-red-500" : ""}
                    />
                    {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber.message}</p>}
                  </div>

                  <div className="form-group">
                    <Label htmlFor="idDocument">Upload ID Document</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="idDocument" className="relative cursor-pointer rounded-md font-medium text-[#FF4E00] hover:text-[#e24603]">
                            <span>Upload a file</span>
                            <input
                              id="idDocument"
                              type="file"
                              className="sr-only"
                              accept="image/*,.pdf"
                              {...register("idDocument", { 
                                required: "ID document is required" 
                              })}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                    {errors.idDocument && 
                      <p className="text-red-500 text-sm">{errors.idDocument.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <Label htmlFor="personalBankAccount">Personal Bank Account Number</Label>
                      <Input 
                        id="personalBankAccount"
                        {...register("personalBankAccount", { 
                          required: "Personal bank account number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Bank account must be 10 digits"
                          }
                        })}
                        placeholder="10-digit account number"
                        className={errors.personalBankAccount ? "border-red-500" : ""}
                      />
                      {errors.personalBankAccount && 
                        <p className="text-red-500 text-sm">{errors.personalBankAccount.message}</p>}
                    </div>

                    <div className="form-group">
                      <Label htmlFor="personalBankName">Bank Name</Label>
                      <Controller
                        control={control}
                        name="personalBankName"
                        rules={{ required: "Bank name is required" }}
                        render={({ field }) => (
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger className={errors.personalBankName ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select Bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="access">Access Bank</SelectItem>
                              <SelectItem value="gtb">GTBank</SelectItem>
                              <SelectItem value="firstbank">First Bank</SelectItem>
                              <SelectItem value="zenith">Zenith Bank</SelectItem>
                              <SelectItem value="uba">UBA</SelectItem>
                              {/* More banks would be added in a real implementation */}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.personalBankName && 
                        <p className="text-red-500 text-sm">{errors.personalBankName.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Registered Business Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group">
                    <Label htmlFor="cacNumber">CAC Registration Number (RC or BN)</Label>
                    <Input 
                      id="cacNumber"
                      {...register("cacNumber", { 
                        required: "CAC number is required" 
                      })}
                      placeholder="e.g., RC123456 or BN123456"
                      className={errors.cacNumber ? "border-red-500" : ""}
                    />
                    {errors.cacNumber && <p className="text-red-500 text-sm">{errors.cacNumber.message}</p>}
                  </div>

                  <div className="form-group">
                    <Label htmlFor="directorName">Primary Director's Full Name</Label>
                    <Input 
                      id="directorName"
                      {...register("directorName", { 
                        required: "Director's name is required" 
                      })}
                      placeholder="Director's full name"
                      className={errors.directorName ? "border-red-500" : ""}
                    />
                    {errors.directorName && <p className="text-red-500 text-sm">{errors.directorName.message}</p>}
                  </div>

                  <div className="form-group">
                    <Label htmlFor="directorBVN">Primary Director's BVN (if different from contact person)</Label>
                    <Input 
                      id="directorBVN"
                      {...register("directorBVN")}
                      placeholder="11-digit BVN (leave blank if same as contact)"
                      className={errors.directorBVN ? "border-red-500" : ""}
                    />
                    {errors.directorBVN && <p className="text-red-500 text-sm">{errors.directorBVN.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <Label htmlFor="businessBankAccount">Business Bank Account Number</Label>
                      <Input 
                        id="businessBankAccount"
                        {...register("businessBankAccount", { 
                          required: "Business bank account number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Bank account must be 10 digits"
                          }
                        })}
                        placeholder="10-digit account number"
                        className={errors.businessBankAccount ? "border-red-500" : ""}
                      />
                      {errors.businessBankAccount && 
                        <p className="text-red-500 text-sm">{errors.businessBankAccount.message}</p>}
                    </div>

                    <div className="form-group">
                      <Label htmlFor="businessBankName">Bank Name</Label>
                      <Controller
                        control={control}
                        name="businessBankName"
                        rules={{ required: "Bank name is required" }}
                        render={({ field }) => (
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger className={errors.businessBankName ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select Bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="access">Access Bank</SelectItem>
                              <SelectItem value="gtb">GTBank</SelectItem>
                              <SelectItem value="firstbank">First Bank</SelectItem>
                              <SelectItem value="zenith">Zenith Bank</SelectItem>
                              <SelectItem value="uba">UBA</SelectItem>
                              {/* More banks would be added in a real implementation */}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.businessBankName && 
                        <p className="text-red-500 text-sm">{errors.businessBankName.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Agreement */}
            <div className="flex items-center space-x-2 mt-6">
              <Checkbox 
                id="agreeTerms" 
                {...register("agreeTerms")}
              />
              <Label htmlFor="agreeTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to the <a href="#" className="text-[#FF4E00] hover:underline">Terms of Service</a> and <a href="#" className="text-[#FF4E00] hover:underline">Privacy Policy</a>
              </Label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>}

            <Button 
              type="submit" 
              className="w-full bg-[#FF4E00] hover:bg-[#e24603]" 
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
            Already have an account? <Link to="/login" className="text-[#FF4E00] hover:underline">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MerchantSignup;
