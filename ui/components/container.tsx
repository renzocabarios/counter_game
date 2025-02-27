import React from "react";

function Container({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <section className={"max-w-[1184px] " + className}>{children}</section>
  );
}

export default Container;
