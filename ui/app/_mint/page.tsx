import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function page() {
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
          <Container className="h-[100vh]">
            <div className="flex w-full items-center justify-center lg:gap-8">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex size-[500px] items-center justify-center rounded-[16px] bg-white/100">
                  <img
                    className="size-[213px]"
                    src="/icons/upload.png"
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex size-[160px] items-center justify-center rounded-[8px] bg-white/100">
                    <img
                      className="size-[68px]"
                      src="/icons/upload.png"
                      alt=""
                    />
                  </div>
                  <div className="flex size-[160px] items-center justify-center rounded-[8px] bg-white/100">
                    <img
                      className="size-[68px]"
                      src="/icons/upload.png"
                      alt=""
                    />
                  </div>
                  <div className="flex size-[160px] items-center justify-center rounded-[16px] bg-white/100">
                    <img
                      className="size-[68px]"
                      src="/icons/upload.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-[132px] flex-col items-center justify-center">
                  <p className="description text-white/100">Select Phase</p>
                  <p className="subtext text-white/50">
                    You can select multiple phases to mint
                  </p>
                  <Button className="w-full bg-white/100 py-2 text-center text-black/100">
                    Mint
                  </Button>
                </div>
              </div>
            </div>
          </Container>

          <Container className="h-[100vh]">
            <div className="flex h-full w-full flex-col items-center justify-center text-center lg:gap-12">
              <h4 className="subheading text-white/100">
                Ready to level up? Get started now!
              </h4>
              <Button className="title rounded-full border border-orange/100 uppercase text-orange/100">
                <Link href="/arcade/onboarding/">Get Started</Link>
              </Button>
            </div>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}
