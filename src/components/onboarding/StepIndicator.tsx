
import React from 'react';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="w-full bg-gray-200 h-1 mb-6">
      <div 
        className="bg-[#1E4FFF] h-full transition-all duration-300 ease-in-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
};

export default StepIndicator;
