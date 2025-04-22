
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type ContactInfoFormData = {
  email: string;
  phoneNumber: string;
};

type ContactInfoStepProps = {
  onNext: (data: ContactInfoFormData) => void;
};

const ContactInfoStep = ({ onNext }: ContactInfoStepProps) => {
  const [showEmailOTP, setShowEmailOTP] = React.useState(false);
  const [showPhoneOTP, setShowPhoneOTP] = React.useState(false);
  const [emailOTP, setEmailOTP] = React.useState('');
  const [phoneOTP, setPhoneOTP] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);

  const form = useForm<ContactInfoFormData>({
    defaultValues: {
      email: '',
      phoneNumber: '',
    }
  });

  const handleSendOTP = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    
    // In a real implementation, we would send OTPs here
    setShowEmailOTP(true);
    setShowPhoneOTP(true);
  };

  const handleVerifyOTP = () => {
    setIsVerifying(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      onNext(form.getValues());
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <p className="text-muted-foreground">We'll send quick codes to confirm both.</p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            rules={{ 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            rules={{ 
              required: "Phone number is required",
              pattern: {
                value: /^(\+234|0)[0-9]{10}$/,
                message: "Please enter a valid Nigerian phone number"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+234 800 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!showEmailOTP && !showPhoneOTP ? (
            <Button 
              type="button" 
              className="w-full bg-[#1E4FFF]" 
              onClick={handleSendOTP}
            >
              Continue
            </Button>
          ) : null}
        </form>
      </Form>

      {showEmailOTP && (
        <div className="space-y-3">
          <Label htmlFor="email-otp">Enter Email OTP</Label>
          <InputOTP maxLength={6} value={emailOTP} onChange={setEmailOTP}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      )}

      {showPhoneOTP && (
        <div className="space-y-3">
          <Label htmlFor="phone-otp">Enter Phone OTP</Label>
          <InputOTP maxLength={6} value={phoneOTP} onChange={setPhoneOTP}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      )}

      {showEmailOTP && showPhoneOTP && emailOTP.length === 6 && phoneOTP.length === 6 && (
        <Button 
          type="button" 
          className="w-full bg-[#1E4FFF]" 
          onClick={handleVerifyOTP}
          disabled={isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      )}
    </div>
  );
};

export default ContactInfoStep;
