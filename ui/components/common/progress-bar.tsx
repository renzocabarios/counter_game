//? onborading page will be available for unregistered user even the wallet is connected already

//? connect wallet (note connected) 0
//? connect wallet (wallet connected) 1 - can continue
//? create profile provide username (no username) 1
//? create profile provide username (has username) 1 (atleast 4 characters, only receiving numbers and letter)
//? create profile provide username (has username) 2 (atleast 4 characters, only receiving numbers and letter) //! [has username validated and accepted] - can continue
//? upload an image for profile (no image) 2
//? upload an image for profile (chosen an image) 2 (the image will be uploaded and displayed if succeeded)
//? upload an image for profile (chosen an image) 3 (the image succeed uploaded and displayed) - can continue
//? use a referral code (should be exsisting referrer) 3 (no ref code)
//? use a referral code (should be exsisting referrer) 3 (entered a ref code) - [can continue when verified] 4
//? agreed to disclaimer (unchecked agree) 4
//? agreed to disclaimer (checked) - can continue 4
//? welcome message 5 - can continue, button link to arcade

import React from "react";

interface IProgressBarProps {
  steps: number;
  currentStep: number;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
  steps = 5,
  currentStep = 2,
}) => {

  const clampedCurrentStep = Math.min(Math.max(currentStep, 1), steps);

  return (
    <div className="w-full relative">
      <div
        className="h-[50px] rounded-[8px] border-2 border-orange/100 p-1 transition-all duration-300 ease-in-out"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${steps}, 1fr)`,
          gridTemplateRows: "repeat(1, 1fr)",
          gap: "8px",
        }}
      >
        {Array.from({ length: steps }, (_, index) => {
          const isActive = index < clampedCurrentStep;
          const isLast = index === clampedCurrentStep - 1;
          const shouldPulseAll = clampedCurrentStep === steps;

          return (
            <div
              key={index}
              className={`
                ${isActive ? 'bg-orange/100 shadow-md' : ''}
                ${isLast ? 'animate-pulse' : ''}
                transition-all duration-1000 ease-out
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
