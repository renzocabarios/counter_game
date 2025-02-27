import ConnectWallet from "./common/connect-wallet";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="top-0 z-50 flex h-[112px] items-center justify-center bg-white/4 shadow-md">
      <div className="flex h-[80px] w-[383px] items-center justify-end pe-4">
        <Button className="subtitle rounded-full border border-orange/100 text-orange/100">
          Arcade
        </Button>
      </div>
      <div className="flex h-[80px] w-[383px] items-center justify-center">
        <p className="heading uppercase text-white/100">CorePlay</p>
      </div>
      <div className="flex h-[80px] w-[383px] items-center justify-start ps-4">
        <Button className="subtitle rounded-full border border-orange/100 text-orange/100">
          Connect Walet
        </Button>
      </div>
      {/* <ConnectWallet /> */}
    </header>
  );
}
