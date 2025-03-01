function DisplayValue({ value, title }: { value: number; title: string }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="subtext">{title}</p>
      <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-white/8 bg-black/100">
        <p className="">{value}</p>
      </div>
    </div>
  );
}

export default DisplayValue;
