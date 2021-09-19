import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/outline";

function Alert({ error, info, children }) {
  let dynamicClasses = "";

  if (error) {
    dynamicClasses = "bg-red-500";
  } else {
    dynamicClasses = "bg-blue-500";
  }

  return (
    <div className={`flex items-center mb-2 px-4 py-3 text-sm font-bold text-white rounded ${dynamicClasses}`}>
      {error && <ExclamationCircleIcon className="w-6 h-6 mr-2" />}
      {info && <InformationCircleIcon className="w-6 h-6 mr-2" />}

      {children}
    </div>
  );
}

export default Alert;
