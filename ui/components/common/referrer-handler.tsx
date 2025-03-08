"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ReferrerHandler = ({ setReferrer }: { setReferrer: any }) => {
  const searchParams = useSearchParams();
  const referredByID = searchParams.get("referralid");
  console.log("referredByID", referredByID);

  useEffect(() => {
    if (referredByID) {
      setReferrer(referredByID);
    }
  }, [referredByID]);

  return null;
};

export default ReferrerHandler;
