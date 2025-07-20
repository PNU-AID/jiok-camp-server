const LoadingSpinner = () => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center px-[16px] text-center`}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
};

export default LoadingSpinner;
