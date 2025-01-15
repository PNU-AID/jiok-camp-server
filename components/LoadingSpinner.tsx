const LoadingSpinner = () => {
  return (
    <div
      className={
        'absolute left-1/2 top-1/2 z-20 flex h-full w-full -translate-x-[50%] -translate-y-[50%] items-center justify-center rounded px-[16px] text-center'
      }
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
};

export default LoadingSpinner;
