import ConnectWallet from "@/components/common/connect-wallet";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
export default function Header({
  title,
  isOnboarding,
}: {
  title: string;
  isOnboarding?: boolean;
}) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isOnboarding) {
    return (
      <div className="relative z-40 flex h-[112px] w-full items-center justify-center pt-4">
        <div className="sticky right-0 top-0 flex w-full max-w-[1440px] items-center justify-between p-4">
          <p className="subheading uppercase text-white/100">
            {title === "coinflip" ? "Coin Flip" : (title ?? "CorePlay")}
          </p>
          {!isOnboarding && (
            <div className="flex flex-row gap-4">
              <p className="description flex h-full items-center justify-center rounded-sm border border-orange/100 bg-orange/8 p-2 uppercase text-orange/100">
                $Play&nbsp;<span>{0}</span>
              </p>
              <div
                onClick={openConnectModal}
                className="description w-full cursor-pointer rounded-full border border-white/100 bg-orange/100 p-2 text-white/100 hover:bg-orange/80"
              >
                {!isConnected
                  ? "Connect Wallet"
                  : `${address?.slice(0, 6)}…${address?.slice(-4)}`}{" "}
              </div>

              {/* <ConnectWallet /> */}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative z-40 flex h-[112px] w-full items-center justify-center bg-transparent pt-4">
        <div className="sticky right-0 top-0 flex w-full max-w-[1440px] items-center justify-center p-4">
          <p className="heading uppercase text-white/100">CorePlay</p>
        </div>
      </div>
    );
  }
}
