import ConnectWallet from "./common/connect-wallet";

export default function Header() {
  return (
    <div className="w-full flex sticky items-center justify-center p-5 border-b-2 border-gray-500">
      <div className="w-full max-w-[1440px] flex items-center justify-between ">
        <p>CorePlay</p>
        <ConnectWallet />
      </div>
    </div>
  );
}
