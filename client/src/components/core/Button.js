import Link from "./Link";

function Button({ to, outline, children }) {
  const bg = () => {
    if (outline) {
      return "bg-transparent border border-gray-100 border-opacity-50 hover:bg-gray-100 hover:text-gray-900";
    } else {
      return "bg-purple-500 hover:bg-purple-600";
    }
  };

  return (
    <>
      <Link to={to || "#"}>
        <div className={`${bg()}  text-white py-2 px-3 rounded font-bold`}>{children}</div>
      </Link>
    </>
  );
}

export default Button;
