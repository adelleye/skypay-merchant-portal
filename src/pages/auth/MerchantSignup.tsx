
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "@/components/onboarding/StepIndicator";
import ContactInfoStep from "@/components/onboarding/ContactInfoStep";
import BusinessDetailsStep from "@/components/onboarding/BusinessDetailsStep";
import DirectorVerificationStep from "@/components/onboarding/DirectorVerificationStep";
import OtherDirectorsStep from "@/components/onboarding/OtherDirectorsStep";
import SettlementAccountStep from "@/components/onboarding/SettlementAccountStep";
import ReviewFinishStep from "@/components/onboarding/ReviewFinishStep";

// Define the steps in our onboarding flow
enum OnboardingStep {
  CONTACT_INFO = 0,
  BUSINESS_DETAILS = 1,
  DIRECTOR_VERIFICATION = 2,
  OTHER_DIRECTORS = 3,
  SETTLEMENT_ACCOUNT = 4,
  REVIEW_FINISH = 5
}

const MerchantSignup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.CONTACT_INFO);
  
  const [formData, setFormData] = useState({
    contact: {
      email: "",
      phoneNumber: "",
    },
    business: {
      cacNumber: "",
      businessName: "",
      businessAddress: "",
    },
    primaryDirector: {
      bvn: "",
      directorName: "",
      directorDob: "",
      bvnConsent: false,
      selfieVerified: false,
    },
    otherDirectors: {
      directorEmails: [{ email: "" }],
    },
    settlementAccount: {
      accountMethod: "manual",
      accountNumber: "",
      bankName: "",
    }
  });

  const handleContactInfoNext = (data: any) => {
    setFormData(prev => ({ ...prev, contact: data }));
    setCurrentStep(OnboardingStep.BUSINESS_DETAILS);
  };

  const handleBusinessDetailsNext = (data: any) => {
    setFormData(prev => ({ ...prev, business: data }));
    setCurrentStep(OnboardingStep.DIRECTOR_VERIFICATION);
  };

  const handleDirectorVerificationNext = (data: any) => {
    setFormData(prev => ({ ...prev, primaryDirector: data }));
    setCurrentStep(OnboardingStep.OTHER_DIRECTORS);
  };

  const handleOtherDirectorsNext = (data: any) => {
    setFormData(prev => ({ ...prev, otherDirectors: data }));
    setCurrentStep(OnboardingStep.SETTLEMENT_ACCOUNT);
  };

  const handleOtherDirectorsSkip = () => {
    setCurrentStep(OnboardingStep.SETTLEMENT_ACCOUNT);
  };

  const handleSettlementAccountNext = (data: any) => {
    setFormData(prev => ({ ...prev, settlementAccount: data }));
    setCurrentStep(OnboardingStep.REVIEW_FINISH);
  };

  const handleComplete = async () => {
    try {
      // In a real implementation, we would send all collected data to the backend
      await register({
        email: formData.contact.email,
        businessName: formData.business.businessName,
        phoneNumber: formData.contact.phoneNumber,
        isRegisteredWithCAC: "yes", // Only allowing CAC registered businesses in v0.2
        ownerFirstName: formData.primaryDirector.directorName.split(' ')[0] || "",
        ownerLastName: formData.primaryDirector.directorName.split(' ').slice(1).join(' ') || "",
        bvn: formData.primaryDirector.bvn,
        cacNumber: formData.business.cacNumber,
        directorName: formData.primaryDirector.directorName,
        businessBankAccount: formData.settlementAccount.accountNumber,
        businessBankName: formData.settlementAccount.bankName,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create account:", error);
      toast({
        title: "Error",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive"
      });
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case OnboardingStep.CONTACT_INFO:
        return <ContactInfoStep onNext={handleContactInfoNext} />;
      
      case OnboardingStep.BUSINESS_DETAILS:
        return <BusinessDetailsStep onNext={handleBusinessDetailsNext} onBack={goBack} />;
      
      case OnboardingStep.DIRECTOR_VERIFICATION:
        return <DirectorVerificationStep onNext={handleDirectorVerificationNext} onBack={goBack} />;
      
      case OnboardingStep.OTHER_DIRECTORS:
        return <OtherDirectorsStep 
          onNext={handleOtherDirectorsNext} 
          onBack={goBack}
          onSkip={handleOtherDirectorsSkip}
        />;
      
      case OnboardingStep.SETTLEMENT_ACCOUNT:
        return <SettlementAccountStep 
          businessName={formData.business.businessName}
          onNext={handleSettlementAccountNext} 
          onBack={goBack} 
        />;
      
      case OnboardingStep.REVIEW_FINISH:
        return <ReviewFinishStep 
          formData={formData}
          onBack={goBack}
          onComplete={handleComplete}
        />;
      
      default:
        return <ContactInfoStep onNext={handleContactInfoNext} />;
    }
  };

  // Calculate total number of steps
  const totalSteps = Object.keys(OnboardingStep).length / 2;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl animate-fade-in p-8">
        <div className="mb-8 flex justify-center">
          <div className="h-12 w-12 rounded-full bg-[#1E4FFF] flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">SP</span>
          </div>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps-1} />
        
        {renderStep()}
      </Card>
    </div>
  );
};

export default MerchantSignup;
