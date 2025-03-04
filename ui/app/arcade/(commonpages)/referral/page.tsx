"use client";
import Background from "@/components/background";
import StatsTable from "@/components/stats-table";
import { Button } from "@/components/ui/button";
import { IoCopy } from "react-icons/io5";

export default function Referral() {
  const referrals = [
    {
      rank: 1,
      user: "0xds..fear",
      referrals: 9,
    },
    {
      rank: 2,
      user: "0xds..dear",
      referrals: 6,
    },
  ];

  const referralID: string = "U9Y1aqem";

  const onCopy = (clipCopy: string) => {
    navigator.clipboard
      .writeText(clipCopy)
      .then(() => {
        console.log("Referral ID copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <>
      <Background />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[1440px] flex-col gap-8 p-8">
          <div className="flex h-[474px] basis-[70%] gap-4 rounded-md border border-white/32 bg-black/50 p-4">
            <div className="flex w-[50%] basis-[55%] flex-col items-center justify-center gap-2">
              <div className="flex w-full items-center justify-center gap-2">
                <div className="flex h-[108px] w-1/2 flex-col items-center justify-around rounded-[4px] border border-white/32 p-4">
                  <p className="subtext w-full whitespace-nowrap text-center text-white/50">
                    Total Points Earned:
                  </p>
                  <div className="title flex h-[50px] w-full items-center justify-center rounded-[16px] bg-white/100 uppercase text-black/100">
                    0
                  </div>
                </div>
                <div className="flex h-[108px] w-1/2 flex-col items-center justify-around rounded-[4px] border border-white/32 p-4">
                  <p className="subtitle w-full text-nowrap text-center text-[10px] text-white/50">
                    Referrals:
                  </p>
                  <div className="title flex h-[50px] w-full items-center justify-center rounded-[16px] bg-white/100 uppercase text-black/100">
                    0
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <Button className="title flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[16px] bg-white/100 text-black/100 hover:bg-black/72 hover:text-white/100">
                  Share with friends
                </Button>
                <Button className="title flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[16px] bg-white/100 text-black/100 hover:bg-black/72 hover:text-white/100">
                  Share on X
                </Button>
              </div>
            </div>
            <div className="flex w-[50%] flex-col items-center justify-center gap-4 rounded-md border border-white/32 bg-black/50 p-4">
              <p className="w-full text-center text-white/100">
                Invite A Friend
              </p>
              <div className="subtext flex w-full items-center justify-between rounded-[8px] border border-white/4 bg-grey-500 p-4">
                <p className="whitespace-nowrap text-white/50">Referral ID</p>
                <div className="flex w-full items-center justify-end text-white/100">
                  <p>{referralID}</p>
                  <Button
                    className="text-white/100"
                    onClick={() => onCopy(referralID)}
                  >
                    <IoCopy className="text-[24px] text-white/100" />
                  </Button>
                </div>
              </div>
              <div className="subtext flex w-full items-center justify-between rounded-[8px] border border-white/4 bg-grey-500 p-4">
                <p className="whitespace-nowrap text-white/50">Referral Link</p>
                <div className="flex w-full items-center justify-end text-white/100">
                  <p>https://corep..</p>
                  <Button
                    className="bg-transparent text-white/100 hover:bg-transparent"
                    onClick={() =>
                      onCopy("https://coreplay.com/?ref=" + referralID)
                    }
                  >
                    <IoCopy className="text-[24px] text-white/100" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <div className="flex justify-between py-2 text-white/100">
              <p className="subheading">Referral Leaderboard</p>
            </div>
            <div className="flex h-[352px] w-full flex-col gap-4 rounded-md border border-white/32 bg-black/50 p-4 text-white/100">
              <StatsTable referpage data={referrals} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
