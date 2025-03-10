"use client";
import { Button } from "@/components/ui/button";
import {
  ChooseUsernameSchema,
  IChooseUsernameSchema,
} from "@/lib/schemas/onboarding.schema";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "@/store/store";

export default function UploadProfile() {
  const { setOnboardingPageNumber, onboardingPageNumber } = useStore();

  const form = useForm<IChooseUsernameSchema>({
    resolver: zodResolver(ChooseUsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    console.log(form?.formState?.isValid);
  }, [form?.formState?.isValid]);

  const {
    mutate: validateUsername,
    data: users,
    isSuccess: validateUsernameIsSuccess,
  } = useMutation({
    mutationFn: async ({ username }: any) => {
      const {
        data: { data },
      } = await axios.get(`http://localhost:9000/users/username/${username}`);
      return data;
    },
  });

  useEffect(() => {
    if (validateUsernameIsSuccess && users.length == 0) {
      setOnboardingPageNumber(onboardingPageNumber + 1);
    }
  }, [users, validateUsernameIsSuccess]);

  const onContinue = () => {
    validateUsername({ username: form.getValues("username") });
  };

  return (
    <>
      <p className="subheading text-center uppercase text-white/100">
        Create your Profile
      </p>
      <div className="flex flex-col gap-2">
        <p className="subtitle text-left text-green/100">Add profile pic</p>
        <div className="flex w-full items-center justify-center">
          <div
          // onClick={handleImageClick}
          // onDrop={handleDrop}
          // onDragOver={handleDragOver}
          // className={`relative flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-md bg-white/100 ${selectedImage ? "w-[200px]" : "w-full"}`}
          >
            {/* {!selectedImage ? (
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
                  )} */}
            {/* <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  /> */}
          </div>
        </div>
        <p className="subtitle mt-2 text-left text-green/100">
          You can always change your picture!
        </p>
      </div>
      <Button
        // onClick={() => handleContinue(3)}
        // disabled={!selectedImage}
        className="title h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
      >
        Continue
      </Button>
    </>
  );
}
