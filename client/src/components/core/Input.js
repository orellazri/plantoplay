function Input({ type, placeholder }) {
  return (
    <input
      className="w-full px-3 py-2 leading-tight text-gray-300 bg-gray-600 rounded shadow-md appearance-none focus:outline-none"
      type={type}
      placeholder={placeholder}
    />
  );
}

export default Input;
