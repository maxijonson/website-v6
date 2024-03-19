const BreakpointOverlay = () => {
  return (
    <div className="fixed bottom-0 left-0 z-[10000000] bg-black p-2 text-xs text-white opacity-20 hover:opacity-100">
      <span className="block sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block">xl</span>
    </div>
  );
};

export default BreakpointOverlay;
