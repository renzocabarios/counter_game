import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
      <Header />
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
      ></div>
      <div className="h-full">
        <main className="flex h-full w-full flex-col items-center justify-center">
          <Container className="-mt-[80px] h-[100vh]">
            <div className="flex h-full w-full flex-col items-center justify-center lg:gap-12">
              <div className="flex flex-col items-center justify-center text-center">
                <h1 className="heading uppercase text-white/100">
                  Welcome to CorePlay
                </h1>
                <p className="subtitle text-green/100">
                  Climb the leaderboard, earn $PLAY,
                  <br /> and dominate CorePlay!
                </p>
              </div>
              <Button className="title rounded-full border border-orange/100 uppercase text-orange/100">
                <Link href="/arcade/counter">Get Started</Link>
              </Button>
            </div>
          </Container>
          <Container className="h-[100vh]">
            <div className="flex w-full flex-col items-center justify-center lg:gap-8">
              <h2 className="heading text-white/100">Story Time</h2>
              <p className="title w-[600px] text-center text-green/100">
                CorePlay brings classic arcade-style gaming to Web3, where skill
                meets blockchain rewards. Compete, earn, and own in-game assets
                with the power of $PLAY.
              </p>
            </div>
          </Container>
          <Container className="h-[100vh]">
            <div className="grid max-w-[749px] grid-cols-4 grid-rows-3 gap-16 text-center">
              <div className="col-span-4 row-span-1">
                <p className="heading text-white/100">Are you ready</p>
                <h3>
                  The Ultimate Web3 Arcade on Core Blockchain Own in-game items
                  as NFTs.
                </h3>
              </div>

              {features.map((feature, index) => {
                const colStart =
                  index % 2 === 0 ? "col-start-3" : "col-start-1";
                const rowStart = index < 2 ? "row-start-2" : "row-start-3";

                return (
                  <div
                    key={index}
                    className={`col-span-2 row-span-1 flex flex-col justify-around ${colStart} ${rowStart}`}
                  >
                    <figure className="flex items-center justify-center">
                      {feature.icon && (
                        <Image
                          width={48}
                          height={48}
                          src={feature.icon}
                          alt="Icon"
                        />
                      )}
                    </figure>
                    <div>
                      <p className="title text-green/100">{feature.title}</p>
                      <p className="subtext text-green/100">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
          <Container className="h-[100vh]">
            <div className="flex h-full w-full flex-col items-center justify-center text-center lg:gap-12">
              <h4 className="subheading text-white/100">
                Ready to level up? Get started now!
              </h4>
              <Button className="title rounded-full border border-orange/100 uppercase text-orange/100">
                <Link href="/arcade/counter">Get Started</Link>
              </Button>
            </div>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}
