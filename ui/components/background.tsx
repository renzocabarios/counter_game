import React from "react";

export default function Background() {
  return (
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
  );
}
