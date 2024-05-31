const CurrentBreakpoint = () => {
  return (
    <div className="bg-black p-2">
      <span className="block sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block">xl</span>
    </div>
  );
};

export default CurrentBreakpoint;
