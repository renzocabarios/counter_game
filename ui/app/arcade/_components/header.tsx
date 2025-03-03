import ConnectWallet from "@/components/common/connect-wallet";

export default function Header({ title }: { title: string }) {
  return (
    <div className="relative z-40 flex w-full items-center justify-center pt-4">
      <div className="sticky right-0 top-0 flex w-full max-w-[1440px] items-center justify-between p-4">
        <p className="subheading uppercase text-white/100">
          {title === "coinflip" ? "Coin Flip" : (title ?? "CorePlay")}
        </p>

        <div className="flex flex-row gap-4">
          <p className="description flex h-full items-center justify-center rounded-sm border border-orange/100 bg-orange/8 p-2 uppercase text-orange/100">
            $Play&nbsp;<span>{0}</span>
          </p>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}
