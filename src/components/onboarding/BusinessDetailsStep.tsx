
import React, { useState } from 'react';
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
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type BusinessDetailsFormData = {
  cacNumber: string;
  businessName: string;
  businessAddress: string;
};

type BusinessDetailsStepProps = {
  onNext: (data: BusinessDetailsFormData) => void;
  onBack: () => void;
};

const BusinessDetailsStep = ({ onNext, onBack }: BusinessDetailsStepProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const form = useForm<BusinessDetailsFormData>({
    defaultValues: {
      cacNumber: '',
      businessName: '',
      businessAddress: '',
    }
  });

  const handleVerifyCacNumber = async () => {
    const cacNumber = form.getValues('cacNumber');
    if (!cacNumber) {
      form.setError('cacNumber', {
        type: 'required',
        message: 'CAC Number is required'
      });
      return;
    }

    // Format validation
    const cacRegex = /^(RC|BN)[0-9]{6,}$/i;
    if (!cacRegex.test(cacNumber)) {
      form.setError('cacNumber', {
        type: 'pattern',
        message: 'Please enter a valid RC or BN number (e.g., RC123456 or BN123456)'
      });
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    // Simulate API call to CAC verification service
    setTimeout(() => {
      setIsVerifying(false);
      
      // For demo purposes, hardcoded success for specific patterns
      if (cacNumber.toUpperCase().startsWith('RC123') || cacNumber.toUpperCase().startsWith('BN456')) {
        setVerificationSuccess(true);
        form.setValue('businessName', `SkyPay Test Business ${cacNumber.slice(-3)}`);
        form.setValue('businessAddress', '123 Lekki Phase 1, Lagos, Nigeria');
      } else {
        setVerificationError("We couldn't find that CAC number—check format.");
      }
    }, 1500);
  };

  const handleContinue = () => {
    onNext(form.getValues());
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">CAC & Business Details</h2>
        <p className="text-muted-foreground">Enter your CAC registration number.</p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="cacNumber"
            rules={{ 
              required: "CAC number is required",
              pattern: {
                value: /^(RC|BN)[0-9]{6,}$/i,
                message: "Please enter a valid RC or BN number"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>CAC Number (RC or BN)</FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input placeholder="RC123456 or BN123456" {...field} />
                  </FormControl>
                  <Button 
                    type="button" 
                    onClick={handleVerifyCacNumber}
                    disabled={isVerifying}
                    className="bg-[#1E4FFF]"
                  >
                    {isVerifying ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Verify'
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {verificationError && (
            <Alert variant="destructive">
              <AlertDescription>{verificationError}</AlertDescription>
            </Alert>
          )}

          {verificationSuccess && (
            <>
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-gray-100" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              type="button" 
              className="flex-1 bg-[#1E4FFF]"
              disabled={!verificationSuccess}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessDetailsStep;
