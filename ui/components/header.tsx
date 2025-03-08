import Link from "next/link";
import { Button } from "./ui/button";
// import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Header() {
  // const { openConnectModal } = useConnectModal();
  return (
    <header className="top-0 z-50 flex h-[112px] items-center justify-center bg-white/4 shadow-md">
      <div className="flex h-[80px] w-[383px] items-center justify-end pe-4">
        <Button className="subtitle rounded-full border border-orange/100 text-orange/100">
          <Link href="/arcade/">Arcade</Link>
        </Button>
      </div>
      <div className="flex h-[80px] w-[383px] items-center justify-center">
        <p className="heading uppercase text-white/100">CorePlay</p>
      </div>
      <div className="flex h-[80px] w-[383px] items-center justify-start ps-4">
        <Button className="subtitle rounded-full border border-orange/100 text-orange/100">
          <Link href="/arcade/onboarding/">Connect Wallet</Link>
        </Button>
      </div>
    </header>
  );
}

// <div className="relative z-40 flex w-full items-center justify-center">
//   <div className="sticky right-0 top-0 flex w-full max-w-[1440px] items-center justify-between p-4">
//     <p className="heading uppercase text-white/100">CorePlay</p>

//     <ConnectWallet />
//   </div>
// </div>
