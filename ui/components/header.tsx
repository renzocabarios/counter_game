import ConnectWallet from "./common/connect-wallet";

export default function Header() {
  return (
    <div className="sticky flex w-full items-center justify-center border-b-2 border-gray-500 p-5">
      <div className="flex w-full max-w-[1440px] items-center justify-between">
        <p>CorePlay</p>
        <ConnectWallet />
      </div>
    </div>
  );
}
