"use client";
import { Button } from "@/components/ui/button";
import {
  IReferralCodeSchema,
  ReferralCodeSchema,
} from "@/lib/schemas/onboarding.schema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "@/store/store";

export default function ReferralCode() {
  const {
    setOnboardingPageNumber,
    onboardingPageNumber,
    referralCodeValidated,
    setReferralCodeValidated,
    setOnboardingPayload,
    onboardingPayload,
  } = useStore();

  const form = useForm<IReferralCodeSchema>({
    resolver: zodResolver(ReferralCodeSchema),
    defaultValues: {
      referralCode: undefined,
    },
  });

  const {
    mutate: validateReferralCode,
    data: users,
    isSuccess: validateReferralCodeIsSuccess,
  } = useMutation({
    mutationFn: async ({ referralCode }: any) => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:9000/users/referralCode/${referralCode}`,
        );
        setReferralCodeValidated(true);

        return data;
      } catch (e) {
        setReferralCodeValidated(false);

        return null;
      }
    },
  });

  const onValidateReferralCode = () => {
    validateReferralCode({ referralCode: form.getValues("referralCode") });
  };

  const onContinue = () => {
    setOnboardingPayload({
      ...onboardingPayload,
      referralCode: form?.getValues("referralCode"),
    });
    setOnboardingPageNumber(onboardingPageNumber + 1);
  };

  return (
    <>
      <p className="subheading text-center uppercase text-white/100">
        Use Referral Code
      </p>

      <Form {...form}>
        <FormField
          control={form.control}
          name="referralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn("title text-green/100")}>Code</FormLabel>
              <FormControl>
                <div className={cn("flex items-center justify-center gap-2")}>
                  <Input
                    placeholder="Paste code here"
                    {...field}
                    className={cn(
                      `h-[82px] w-full cursor-text appearance-none border-none border-b-green/100 bg-transparent p-4 text-white/100 focus:outline-none focus:ring-0`,
                    )}
                  />

                  {referralCodeValidated ? (
                    <Button className="title h-[30px] rounded-[8px] bg-white/100 text-black/100 hover:bg-white/80">
                      Successful
                    </Button>
                  ) : (
                    <Button
                      onClick={onValidateReferralCode}
                      className="title h-[30px] rounded-[8px] bg-white/100 text-black/100 hover:bg-white/80"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormDescription className={cn("text-sm text-green/100")}>
                Submit a friend code!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button
        onClick={onContinue}
        disabled={!referralCodeValidated}
        // disabled={!isReferralValid}
        className="title h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
      >
        Continue
      </Button>
      <Button
        onClick={onContinue}
        className="title bg-gray/100 hover:bg-gray/80 h-[82px] w-full text-white/100"
      >
        Skip
      </Button>
    </>
  );
}
