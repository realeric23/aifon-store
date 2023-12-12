function Spinner() {
  return (
    <div role="status" className="flex items-center justify-center h-full">
      <div className="flex space-x-2 items-center">
        <span className="sr-only">Loading...</span>
        <div
          className="h-4 w-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-bounce"
          style={{ animationDelay: "-0.3s" }}
        ></div>
        <div
          className="h-4 w-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-bounce"
          style={{ animationDelay: "-0.15s" }}
        ></div>
        <div className="h-4 w-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

export default Spinner;
