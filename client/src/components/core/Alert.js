function Alert({ error, info, children }) {
  let dynamicClasses = "";

  if (error) {
    dynamicClasses = "bg-red-500";
  } else {
    dynamicClasses = "bg-blue-500";
  }

  return (
    <div className={`flex items-center mb-2 px-4 py-3 text-sm font-bold text-white rounded ${dynamicClasses}`}>
      {error && (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {info && (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      {children}
    </div>
  );
}

export default Alert;
