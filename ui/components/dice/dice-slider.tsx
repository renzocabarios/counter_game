"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function RollSlider({
  sliderValue,
  setSliderValue,
  step = 1,
}: {
  sliderValue: number;
  setSliderValue: (value: number) => void;
  step?: number;
}) {
  const onSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  return (
    <div className="relative w-full rounded-lg p-4">
      <Slider
        value={[sliderValue]}
        min={1}
        max={100}
        step={step}
        onValueChange={onSliderChange}
        className={cn("w-full")}
        // Add custom thumb styling to show value
        // thumbProps={{
        //   className: "relative",
        //   children: (
        //     <span className="absolute top-[-1.5em] text-xs font-medium">
        //       {sliderValue}
        //     </span>
        //   ),
        // }}
      />
    </div>
  );
}
