import Image from "next/image";

function CoinHeads({s}:{s?:number}) {
  return (
    <Image
    width={s ?? 150}
    height={s ?? 150}
      alt="Headed Coin"
      src="/icons/coinflip/coin-heads.png"
    />
  );
}

export default CoinHeads;
