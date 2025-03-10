"use client";
import { Button } from "@/components/ui/button";
import {
  ChooseUsernameSchema,
  IChooseUsernameSchema,
} from "@/lib/schemas/onboarding.schema";
import React, { useEffect } from "react";
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

export default function ChooseUsername() {
  const {
    setOnboardingPageNumber,
    onboardingPageNumber,
    setOnboardingPayload,
    onboardingPayload,
  } = useStore();

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
      setOnboardingPayload({
        ...onboardingPayload,
        username: form?.getValues("username"),
      });
      setOnboardingPageNumber(onboardingPageNumber + 1);
    }
  }, [users, validateUsernameIsSuccess, form?.getValues("username")]);

  const onContinue = () => {
    validateUsername({ username: form.getValues("username") });
  };

  return (
    <>
      <p className="subheading text-center uppercase text-white/100">
        Create your Profile
      </p>
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn("title text-green/100")}>
                Username
              </FormLabel>
              <FormControl>
                <Input placeholder="at least 4 characters" {...field} />
              </FormControl>
              <FormDescription className={cn("text-sm text-green/100")}>
                You can always change your name!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>

      <Button
        disabled={!form?.formState?.isValid}
        onClick={onContinue}
        className="title h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
      >
        Continue
      </Button>
    </>
  );
}
