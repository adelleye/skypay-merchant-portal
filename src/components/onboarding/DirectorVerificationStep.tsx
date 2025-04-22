
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
import { Loader2, Lock, Camera } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type DirectorVerificationFormData = {
  bvn: string;
  directorName: string;
  directorDob: string;
  bvnConsent: boolean;
  selfieVerified: boolean;
};

type DirectorVerificationStepProps = {
  onNext: (data: DirectorVerificationFormData) => void;
  onBack: () => void;
};

const DirectorVerificationStep = ({ onNext, onBack }: DirectorVerificationStepProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [showSelfie, setShowSelfie] = useState(false);
  const [selfieComplete, setSelfieComplete] = useState(false);
  const [consentGranted, setConsentGranted] = useState(false);

  const form = useForm<DirectorVerificationFormData>({
    defaultValues: {
      bvn: '',
      directorName: '',
      directorDob: '',
      bvnConsent: false,
      selfieVerified: false,
    }
  });

  const handleVerifyBvn = async () => {
    const bvn = form.getValues('bvn');
    if (!bvn) {
      form.setError('bvn', {
        type: 'required',
        message: 'BVN is required'
      });
      return;
    }

    // Format validation
    const bvnRegex = /^\d{11}$/;
    if (!bvnRegex.test(bvn)) {
      form.setError('bvn', {
        type: 'pattern',
        message: 'BVN must be 11 digits'
      });
      return;
    }

    setIsVerifying(true);
    setVerificationError('');
    setShowSelfie(true);

    // Simulate API call and selfie capture
    setTimeout(() => {
      setSelfieComplete(true);
      setIsVerifying(false);
      
      // For demo purposes, hardcoded success
      if (bvn === '12345678901' || bvn === '22222222222') {
        setVerificationError('BVN mismatch or invalid');
      } else {
        setVerificationSuccess(true);
        form.setValue('directorName', 'John Adeyemi');
        form.setValue('directorDob', '1985-05-15');
        form.setValue('selfieVerified', true);
      }
    }, 2000);
  };

  const handleOpenConsentPage = () => {
    // In a real app, this would open the iGree BVN consent page in a new tab
    window.open('https://example.com/igree-consent', '_blank');
    
    // Simulate returning with consent granted
    setTimeout(() => {
      setConsentGranted(true);
      form.setValue('bvnConsent', true);
    }, 1500);
  };

  const handleContinue = () => {
    onNext(form.getValues());
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Primary Director Verification</h2>
        <p className="text-muted-foreground">Verify the primary director's identity.</p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="bvn"
            rules={{ 
              required: "BVN is required",
              pattern: {
                value: /^\d{11}$/,
                message: "BVN must be 11 digits"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Bank Verification Number (BVN)</FormLabel>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Lock className="h-3 w-3 mr-1" />
                    Powered by NIBSS
                  </div>
                </div>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input placeholder="11-digit BVN" maxLength={11} {...field} />
                  </FormControl>
                  <Button 
                    type="button" 
                    onClick={handleVerifyBvn}
                    disabled={isVerifying || verificationSuccess}
                    className="bg-[#1E4FFF] whitespace-nowrap"
                  >
                    {isVerifying ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Verify & Selfie'
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

          {showSelfie && !selfieComplete && (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center">
              <Camera className="h-16 w-16 text-gray-400 mb-2" />
              <p className="text-sm text-center text-muted-foreground">
                {isVerifying ? 'Processing selfie...' : 'Position your face in the frame'}
              </p>
            </div>
          )}

          {verificationSuccess && (
            <>
              <FormField
                control={form.control}
                name="directorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Director's Name</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-gray-100" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="directorDob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-gray-100" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button 
                  type="button" 
                  onClick={handleOpenConsentPage}
                  disabled={consentGranted}
                  className={consentGranted ? "bg-[#22C55E] w-full" : "bg-[#1E4FFF] w-full"}
                >
                  {consentGranted ? 'BVN Consent Granted ✓' : 'Grant BVN Consent (iGree)'}
                </Button>
              </div>
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
              disabled={!verificationSuccess || !consentGranted}
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

export default DirectorVerificationStep;
