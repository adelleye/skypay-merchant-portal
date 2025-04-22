
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type OnboardingFormData = {
  contact: {
    email: string;
    phoneNumber: string;
  };
  business: {
    cacNumber: string;
    businessName: string;
    businessAddress: string;
  };
  primaryDirector: {
    bvn: string;
    directorName: string;
    directorDob: string;
    bvnConsent: boolean;
  };
  otherDirectors: {
    directorEmails: Array<{ email: string }>;
  };
  settlementAccount: {
    accountMethod: string;
    accountNumber: string;
    bankName: string;
  };
};

type ReviewFinishStepProps = {
  formData: OnboardingFormData;
  onBack: () => void;
  onComplete: () => void;
};

const ReviewFinishStep = ({ formData, onBack, onComplete }: ReviewFinishStepProps) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = () => {
    if (!agreeTerms) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to create account
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleGoToDashboard = () => {
    onComplete();
  };

  const displayBank = (code: string) => {
    const banks: Record<string, string> = {
      'access': 'Access Bank',
      'gtb': 'GTBank',
      'firstbank': 'First Bank',
      'zenith': 'Zenith Bank',
      'uba': 'UBA',
    };
    return banks[code] || code;
  };

  if (isComplete) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-[#22C55E]/10 p-3">
            <CheckCircle className="h-10 w-10 text-[#22C55E]" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Almost there!</h2>
          <p className="text-muted-foreground mt-2">Your account has been created</p>
        </div>

        <div className="bg-[#F9FAFB] rounded-lg p-4 text-left">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-[#1E4FFF]" />
              Card payments will be live as soon as all directors grant BVN consent (check your email).
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-[#1E4FFF]" />
              Upload CAC certificate + TIN later in Compliance Centre to lift initial ₦1m/day cap.
            </li>
          </ul>
          <div className="mt-4 text-sm">
            <p>Need help? <a href="mailto:support@skypay.ng" className="text-[#1E4FFF]">support@skypay.ng</a></p>
          </div>
        </div>

        <Button 
          className="bg-[#1E4FFF] w-full"
          onClick={handleGoToDashboard}
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Finish</h2>
        <p className="text-muted-foreground">
          Please review your information before creating your account.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-muted-foreground">Business Name</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{formData.business.businessName}</dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-muted-foreground">CAC Number</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{formData.business.cacNumber}</dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{formData.business.businessAddress}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Primary Director</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-muted-foreground">Director Name</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{formData.primaryDirector.directorName}</dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-muted-foreground">BVN Status</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Verified
                  </span>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Settlement Account</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-muted-foreground">Bank</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">
                  {displayBank(formData.settlementAccount.bankName)}
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-muted-foreground">Account Number</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2">{formData.settlementAccount.accountNumber}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox 
          id="agreeTerms" 
          checked={agreeTerms}
          onCheckedChange={(checked) => setAgreeTerms(checked === true)}
        />
        <Label htmlFor="agreeTerms" className="text-sm font-medium leading-none">
          I agree to the <a href="#" className="text-[#1E4FFF] hover:underline">Terms of Service</a> and <a href="#" className="text-[#1E4FFF] hover:underline">Privacy Policy</a>
        </Label>
      </div>

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
          disabled={!agreeTerms || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReviewFinishStep;
