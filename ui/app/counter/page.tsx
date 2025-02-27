import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: "/icons/bitcoin-bag.png",
      title: "Earn While You play",
      subtitle: "Win rewards in $PLAY and other tokens",
    },
    {
      icon: "/icons/joystick-04.png",
      title: "True Digital Ownership",
      subtitle: "Own in-game items as NFTs.",
    },
    {
      icon: "/icons/zap.png",
      title: "Fast & Fair Gameplay",
      subtitle: "Powered by Core Blockchain for smooth transactions. ",
    },
    {
      icon: "/icons/champion.png",
      title: "Climb the Leaderboards",
      subtitle: "Compete for the top spot and exclusive rewards.",
    },
  ];
  return (
    <>
      <div
        className="fixed left-0 top-0 h-[100vh] w-[100vw] bg-fixed"
        style={{
          backgroundImage: "url('/images/coreplay-bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "65%",
          opacity: 0.05,
          zIndex: -1,
          backgroundBlendMode: "lighten",
        }}
      />

      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[1440px] flex-col gap-8 p-8">
          <div className="flex w-full gap-4">
            <div className="flex basis-[70%] flex-col items-center justify-between gap-16 bg-black/100 p-4">
              <div className="flex w-full justify-between">
                <p>Round 1</p>

                <div className="flex flex-col items-end gap-2">
                  <p>current prize pool</p>

                  <p>200,000,00</p>
                </div>
              </div>

              <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white/100">
                <p className="text-6xl text-black">1+</p>
              </div>

              <div className="flex w-full flex-col items-center gap-4">
                <p>Guess</p>

                <div className="flex items-center justify-center gap-4">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/100">
                    <p>-</p>
                  </div>

                  <p>10</p>
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/100">
                    <p>+</p>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="flex basis-[30%] flex-col items-center gap-4">
              <div className="flex w-full items-center justify-center bg-black/100 p-4">
                <p>Recent Transactions</p>
              </div>

              <div className="flex w-full items-center justify-between bg-black/100 p-4">
                <p>0x132..a9s</p>
                <p>1+ GUESS</p>
              </div>
            </div>
          </div>

          {/* <div className="flex w-full flex-col gap-4 p-4">
            <p>Leaderboards</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
