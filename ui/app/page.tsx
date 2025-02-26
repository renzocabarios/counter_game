"use client";
import { Button } from "@/components/ui/button";
import useIncrementCounter from "@/hooks/useIncrementCounter";
import useReadCurrentRound from "@/hooks/useReadCurrentRound";
import useReadPoints from "@/hooks/useReadPoints";

export default function Home() {
  const { data: userpoints } = useReadPoints();

  const { mutate: incrementCounter } = useIncrementCounter();
  const { data: currentRound } = useReadCurrentRound();

  const onIncrement = () => {
    incrementCounter();
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div>
          <div>Point: {Number(userpoints ?? 0) * 10}</div>
          <div>Round: {Number(currentRound)}</div>
          <Button
          // onClick={() => setCount(count + 1)}
          onClick={onIncrement}
          >
            vote
          </Button>
        </div>
      </main>
    </div>
  );
}
