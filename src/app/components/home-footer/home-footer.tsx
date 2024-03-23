const HomeFooter = () => {
  return (
    <footer className="py-8 text-center text-sm" suppressHydrationWarning>
      &copy; 2024
      {new Date().getFullYear() !== 2024
        ? ` - ${new Date().getFullYear()}`
        : ""}{" "}
      &middot; Tristan Chin &middot; All rights reserved
    </footer>
  );
};

export default HomeFooter;
