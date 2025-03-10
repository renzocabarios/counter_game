import { customAlphabet } from "nanoid";
export const generateReferralCode = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  8
);
