"use client";

import React from "react";
import Link from "next/link";

export default function Welcome() {
  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <p className="subheading text-center uppercase text-white/100">
          Welcome
        </p>
        <p className="subtitle max-w-md text-center text-white/80">
          Get ready for an exciting gaming experience powered by blockchain.
        </p>
        <p className="subtitle max-w-md text-center text-white/80">
          Play, compete, and explore a world where your skills and strategy
          matter.
        </p>
        <p className="subtitle max-w-md text-center text-white/80">
          Remember to play responsibly and have fun. Let the games begin!
        </p>

        <Link
          href="/arcade/dice"
          className="title flex h-[82px] w-full max-w-[300px] items-center justify-center rounded-[8px] bg-orange/100 uppercase text-white/100 hover:bg-orange/80"
        >
          To Arcade
        </Link>
      </div>
    </>
  );
}
