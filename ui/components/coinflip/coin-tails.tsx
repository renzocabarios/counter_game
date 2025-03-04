import Image from "next/image";

function CoinTails({ s }: { s?: number }) {
  return (
    <Image
      width={s ?? 150}
      height={s ?? 150}
      alt="Tailed Coin"
      src="/icons/coinflip/coin-tails.png"
    />
  );
}

export default CoinTails;
