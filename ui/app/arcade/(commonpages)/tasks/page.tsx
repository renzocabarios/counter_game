"use client";
import Background from "@/components/background";
import StatsTable from "@/components/stats-table";

export default function Tasks() {
  const tasks = [
    {
      task: "Sign-in",
      points: 1000,
      claimed: false,
    },
    {
      task: "Play 5 times",
      points: 1500,
      claimed: true,
    },
  ];
  return (
    <>
      <Background />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[1440px] flex-col px-8">
          <div className="pb-4">
            <div className="flex justify-between py-2 text-white/100">
              <p className="subheading">Daily</p>
            </div>
            <div className="flex h-[352px] w-full flex-col gap-4 rounded-md border border-white/32 bg-black/50 p-4 text-white/100">
              <StatsTable data={tasks} />
            </div>
          </div>
          <div className="pb-4">
            <div className="flex justify-between py-2 text-white/100">
              <p className="subheading">Weekly</p>
            </div>
            <div className="flex h-[352px] w-full flex-col gap-4 rounded-md border border-white/32 bg-black/50 p-4 text-white/100">
              <StatsTable data={tasks} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
