"use client";
import Background from "@/components/background";
import ProgressBar from "@/components/common/progress-bar";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [referrer, setReferrer] = useState<string>("");
  const [isReferralValid, setIsReferralValid] = useState<boolean>(false); // Track if referral code is validated
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const referredByID = searchParams.get("referralid");
  console.log("referredByID", referredByID);
  const sampleRefIdList = [
    "3F4lkjfi",
    "3fglK55i",
    "k44Lkjr0",
    "9F7lk4fd",
    "a54L3jfG",
  ];

  const onboardingSteps = [
    { id: 1, step: "connect-wallet" },
    { id: 2, step: "choose-username" },
    { id: 3, step: "add-image" },
    { id: 4, step: "use-ref-code" },
    { id: 5, step: "disclaimer" },
    { id: 6, step: "welcome" },
  ];

  useEffect(() => {
    if (referredByID) {
      setReferrer(referredByID);
    }
  }, [referredByID]);

  useEffect(() => {
    if (isConnected && !completedSteps.includes(1)) {
      setCompletedSteps([1]);
      setCurrentStepId(2);
    }
  }, [isConnected]);

  const handleContinue = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    const nextStep = onboardingSteps.find((step) => step.id === stepId + 1);
    if (nextStep) {
      setCurrentStepId(nextStep.id);
    }
  };

  const handleImageChange = (file: File) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) handleImageChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const isUsernameValid = () => {
    const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
    return usernameRegex.test(username);
  };

  const validateReferralCode = () => {
    if (referrer && sampleRefIdList.includes(referrer)) {
      setIsReferralValid(true);
      return true;
    } else {
      setIsReferralValid(false);
      alert("Invalid referral code. Please try again.");
      return false;
    }
  };

  const renderStepContent = () => {
    const currentStep = onboardingSteps.find(
      (step) => step.id === currentStepId,
    );

    switch (currentStep?.step) {
      case "connect-wallet":
        return (
          <>
            <ProgressBar steps={5} currentStep={completedSteps.length} />
            <p className="subheading text-center uppercase text-white/100">
              Connect Wallet
            </p>
            <div className="w-full">
              <Button
                onClick={openConnectModal}
                className="subheading h-[82px] w-full bg-white/100 text-black/100 hover:bg-white/80"
              >
                {!isConnected
                  ? "CONNECT WALLET"
                  : `${address?.slice(0, 6)}…${address?.slice(-4)}`}
              </Button>
              <div className="h-[34px] w-full">
                {!isConnected && (
                  <p className="text-start text-green/100">
                    Connect your wallet to proceed!
                  </p>
                )}
              </div>
            </div>
            <Button
              disabled={!isConnected}
              onClick={() => handleContinue(1)}
              className="title h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
            >
              Continue
            </Button>
          </>
        );

      case "choose-username":
        return (
          <>
            <ProgressBar steps={5} currentStep={completedSteps.length} />
            <p className="subheading text-center uppercase text-white/100">
              Create your Profile
            </p>
            <div>
              <p className="title text-green/100">Username</p>
              <input
                type="text"
                placeholder="Name (min 4 characters only)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="title h-[50px] w-full cursor-text border-b border-green/100 bg-transparent p-4 text-white/50 placeholder-grey-100 focus:outline-none focus:ring-0"
              />
              <p className="mt-2 text-sm text-green/100">
                You can always change your name!
              </p>
            </div>
            <Button
              disabled={!isUsernameValid()}
              onClick={() => handleContinue(2)}
              className="title h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
            >
              Continue
            </Button>
          </>
        );

      case "add-image":
        return (
          <>
            <ProgressBar steps={5} currentStep={completedSteps.length} />
            <p className="subheading text-center uppercase text-white/100">
              Create your Profile
            </p>
            <div className="flex flex-col gap-2">
              <p className="subtitle text-left text-green/100">
                Add profile pic
              </p>
              <div className="flex w-full items-center justify-center">
                <div
                  onClick={handleImageClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`relative flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-md bg-white/100 ${selectedImage ? "w-[200px]" : "w-full"}`}
                >
                  {!selectedImage ? (
                    <>
                      <img
                        src="/icons/upload.png"
                        className="size-[128px]"
                        alt="upload profile picture"
                      />
                      <p className="subtext pt-6 text-center text-black/100">
                        Click here or Drag and Drop your Image
                      </p>
                    </>
                  ) : (
                    <img
                      src={selectedImage}
                      alt="Profile preview"
                      className="aspect-square h-full w-full rounded-md object-cover"
                    />
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>
              <p className="subtitle mt-2 text-left text-green/100">
                You can always change your picture!
              </p>
            </div>
            <Button
              onClick={() => handleContinue(3)}
              disabled={!selectedImage}
              className="title h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
            >
              Continue
            </Button>
          </>
        );

      case "use-ref-code":
        return (
          <>
            <ProgressBar steps={5} currentStep={completedSteps.length} />
            <p className="subheading text-center uppercase text-white/100">
              Use Referral Code
            </p>
            <div>
              <p className="title text-green/100">Code</p>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  value={referrer}
                  placeholder="Paste code here"
                  onChange={(e) => {
                    setReferrer(e.target.value);
                    setIsReferralValid(false);
                  }}
                  className="h-[82px] w-full cursor-text appearance-none rounded-md bg-transparent p-4 text-white/100 focus:outline-none focus:ring-0"
                />
                <Button
                  onClick={validateReferralCode}
                  className="title h-[30px] rounded-[8px] bg-white/100 text-black/100 hover:bg-white/80"
                >
                  Submit
                </Button>
              </div>
              <p className="mt-2 text-sm text-green/100">
                {isReferralValid
                  ? "Referral code validated!"
                  : "Submit a friend code!"}
              </p>
            </div>
            <Button
              onClick={() => handleContinue(4)}
              disabled={!isReferralValid}
              className="title h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
            >
              Continue
            </Button>
            <Button
              onClick={() => handleContinue(4)}
              disabled={isReferralValid}
              className="title bg-gray/100 hover:bg-gray/80 h-[82px] w-full text-white/100"
            >
              Skip
            </Button>
          </>
        );

      case "disclaimer":
        return (
          <>
            <ProgressBar steps={5} currentStep={completedSteps.length} />
            <p className="subheading text-center uppercase text-white/100">
              Disclaimer
            </p>
            <div className="flex h-[200px] w-full flex-col gap-2 overflow-auto rounded-md p-4">
              <p className="text-center text-white/80">
                By using CorePlay, you acknowledge that blockchain transactions
                are final and irreversible.
              </p>
              <p className="text-center text-white/80">
                Users are responsible for their own assets and in-game actions.
                You must be at least 18 years old and legally allowed to
                participate.
              </p>
            </div>
            <div className="flex w-full items-center justify-center">
              <div
                className={`mt-4 flex items-center justify-center gap-2 rounded-[6px] px-2 py-4 transition-colors duration-300 ${
                  isDisclaimerAccepted
                    ? "bg-white/100"
                    : "bg-black/50 ring-1 ring-white/80"
                }`}
              >
                <input
                  type="checkbox"
                  id="disclaimer-checkbox"
                  checked={isDisclaimerAccepted}
                  onChange={(e) => setIsDisclaimerAccepted(e.target.checked)}
                  className="h-5 w-5 cursor-pointer appearance-none border border-black/100 bg-white/100 checked:bg-black/100 checked:text-white/100"
                />
                <label
                  htmlFor="disclaimer-checkbox"
                  className={`whitespace-nowrap text-sm transition-colors duration-300 ${
                    isDisclaimerAccepted ? "text-black/100" : "text-white/100"
                  }`}
                >
                  I agree
                </label>
              </div>
            </div>
            <Button
              onClick={() => handleContinue(5)}
              disabled={!isDisclaimerAccepted}
              className="title mt-4 h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
            >
              Accept & Finish
            </Button>
          </>
        );

      case "welcome":
        return (
          <>
            <ProgressBar steps={5} currentStep={completedSteps.length} />
            <div className="flex flex-col items-center gap-6">
              <p className="subheading text-center uppercase text-white/100">
                Welcome
              </p>
              <p className="subtitle max-w-md text-center text-white/80">
                Get ready for an exciting gaming experience powered by
                blockchain.
              </p>
              <p className="subtitle max-w-md text-center text-white/80">
                Play, compete, and explore a world where your skills and
                strategy matter.
              </p>
              <p className="subtitle max-w-md text-center text-white/80">
                Remember to play responsibly and have fun. Let the games begin!
              </p>
              {/* {selectedImage && (
                <div className="h-24 w-24 overflow-hidden rounded-full">
                  <img
                    src={selectedImage}
                    alt="Your profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              )} */}
              <Link
                href="/arcade"
                className="title flex h-[82px] w-full max-w-[300px] items-center justify-center bg-orange/100 uppercase text-white/100 hover:bg-orange/80"
              >
                To Arcade
              </Link>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  return (
    <>
      <Background />
      <div
        className="flex w-full items-center justify-center"
        style={{ height: "calc(100vh - 112px)" }}
      >
        <div className="flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-8 p-8">
          <div className="flex h-[474px] basis-[70%] items-center justify-center gap-4 rounded-md p-4">
            <div id="container" className="flex w-[608px] flex-col gap-8">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
