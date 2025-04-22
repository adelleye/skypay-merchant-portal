
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SettlementAccountFormData = {
  accountMethod: string;
  accountNumber: string;
  bankName: string;
};

type SettlementAccountStepProps = {
  businessName: string;
  onNext: (data: SettlementAccountFormData) => void;
  onBack: () => void;
};

const SettlementAccountStep = ({ businessName, onNext, onBack }: SettlementAccountStepProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [nameMatch, setNameMatch] = useState('');

  const form = useForm<SettlementAccountFormData>({
    defaultValues: {
      accountMethod: 'manual',
      accountNumber: '',
      bankName: '',
    }
  });

  const handleVerifyAccount = async () => {
    const { accountNumber, bankName } = form.getValues();
    
    if (!accountNumber || !bankName) {
      if (!accountNumber) form.setError('accountNumber', { message: 'Account number is required' });
      if (!bankName) form.setError('bankName', { message: 'Bank name is required' });
      return;
    }

    // Format validation
    const accountRegex = /^\d{10}$/;
    if (!accountRegex.test(accountNumber)) {
      form.setError('accountNumber', {
        type: 'pattern',
        message: 'Account number must be 10 digits'
      });
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    // Simulate API call to verify account
    setTimeout(() => {
      setIsVerifying(false);
      
      // For demo purposes, mock account verification
      if (accountNumber === '1234567890') {
        setVerificationError("Account name doesn't match business name—try another account.");
        setNameMatch('Personal Account - John Adeyemi');
      } else {
        setVerificationSuccess(true);
        setNameMatch(businessName || 'SkyPay Business Ltd');
      }
    }, 1500);
  };

  const handleLinkAccount = () => {
    // In a real app, this would open a third-party widget
    setTimeout(() => {
      setVerificationSuccess(true);
      setNameMatch(businessName || 'SkyPay Business Ltd');
      form.setValue('accountNumber', '9876543210');
      form.setValue('bankName', 'GTBank');
    }, 1000);
  };

  const handleContinue = () => {
    onNext(form.getValues());
  };

  const accountMethod = form.watch('accountMethod');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settlement Account</h2>
        <p className="text-muted-foreground">
          Provide your business bank account for settlements.
        </p>
      </div>

      <Tabs defaultValue="link" onValueChange={(value) => form.setValue('accountMethod', value)}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="link">Link Account</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="link">
          <div className="border rounded-lg p-6 text-center">
            <CreditCard className="h-12 w-12 mx-auto mb-4 text-[#1E4FFF]" />
            <h3 className="text-lg font-medium mb-2">Connect bank account securely</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Use our secure banking partner to connect your business account in seconds.
            </p>
            <Button 
              className="bg-[#1E4FFF] w-full"
              onClick={handleLinkAccount}
              disabled={verificationSuccess}
            >
              {verificationSuccess ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Account Linked Successfully
                </>
              ) : (
                'Open Banking Widget'
              )}
            </Button>
            
            {verificationSuccess && (
              <div className="mt-4 text-left">
                <p className="text-sm font-medium">Account Information:</p>
                <p className="text-sm text-muted-foreground">{nameMatch}</p>
                <p className="text-sm text-muted-foreground">
                  {form.getValues('bankName')} - {form.getValues('accountNumber')}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="manual">
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="accountNumber"
                rules={{ 
                  required: "Account number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Account number must be 10 digits"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number (NUBAN)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="10-digit account number" 
                        maxLength={10}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankName"
                rules={{ required: "Bank name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="access">Access Bank</SelectItem>
                        <SelectItem value="gtb">GTBank</SelectItem>
                        <SelectItem value="firstbank">First Bank</SelectItem>
                        <SelectItem value="zenith">Zenith Bank</SelectItem>
                        <SelectItem value="uba">UBA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button 
                  type="button" 
                  onClick={handleVerifyAccount}
                  disabled={isVerifying}
                  className="bg-[#1E4FFF] w-full"
                >
                  {isVerifying ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Verify Account
                </Button>
              </div>

              {verificationError && (
                <Alert variant="destructive">
                  <AlertDescription>{verificationError}</AlertDescription>
                </Alert>
              )}

              {nameMatch && (
                <Alert variant={verificationSuccess ? "default" : "destructive"}>
                  <AlertDescription>
                    <span className="font-semibold">Account Name:</span> {nameMatch}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </Form>
        </TabsContent>
      </Tabs>

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
    </div>
  );
};

export default SettlementAccountStep;
